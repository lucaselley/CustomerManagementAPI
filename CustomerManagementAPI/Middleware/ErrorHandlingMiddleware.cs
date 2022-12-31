using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.Net;
using System.Text.Json;
using FluentValidation;
using CustomerManagementAPI.Middleware;
using Infrastructure.Exceptions;

namespace CustomerManagementAPI.Middleware {
    public class ErrorHandlingMiddleware {

        private readonly RequestDelegate next;

        public ErrorHandlingMiddleware(RequestDelegate next) {
            this.next = next;
        }

        public async Task Invoke(HttpContext context, ILogger<ErrorHandlingMiddleware> logger, ProblemDetailsFactory pdFactory) {

            ProblemDetails CreateProblemResponse(int? statusCode = null, string? title = null, string? detail = null) {
                var responseModel = pdFactory.CreateProblemDetails(
                    httpContext: context,
                    statusCode: statusCode ?? (int)HttpStatusCode.InternalServerError,
                    title: title ?? "Unexpected error",
                    detail: detail ?? "Unexpected error occured while processing your request.",
                    instance: context.Request.Path);
                context.Response.StatusCode = statusCode ?? (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/problem+json";

                return responseModel;
            }

            ProblemDetails CreateValidationProblemResponse(ValidationException validationException) {
                var problemResponse = CreateProblemResponse((int)HttpStatusCode.BadRequest, nameof(validationException), validationException.Message);
                problemResponse.Extensions.Add("errors", validationException.Errors);
                
                return problemResponse;
            }

            try {
                await this.next(context);
            } catch (ValidationException e) {
                await context.Response.WriteAsync(JsonSerializer.Serialize(CreateValidationProblemResponse(e)));
            } catch (NotFoundException e) {
                await context.Response.WriteAsync(JsonSerializer.Serialize(CreateProblemResponse((int)HttpStatusCode.NotFound, nameof(NotFoundException), e.Message)));
            } catch (Exception e) {
                var response = JsonSerializer.Serialize(CreateProblemResponse());
                logger.LogError(e, "Unexpected exception caught. || {ErrorType}: {ErrorMessage} || Response: {ResponseModel}", e.GetType().Name, e.Message, response);

                await context.Response.WriteAsync(response);
            }
        }

    }
}


public static class ErrorHandlingMiddlewareExtensions {

    // Method for registering the middleware

    public static IApplicationBuilder UseErrorHandlingMiddleware(this IApplicationBuilder builder) {
        return builder.UseMiddleware<ErrorHandlingMiddleware>();
    }
}