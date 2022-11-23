using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomerManagementAPI.Middleware {
    public class ExtensiveLoggerMiddleware {
        private readonly RequestDelegate next;

        public ExtensiveLoggerMiddleware(RequestDelegate next) {
            this.next = next;
        }

        public async Task Invoke(HttpContext context, ILogger<ExtensiveLoggerMiddleware> logger) {
            var tokenString = context.Request.Headers.Authorization.ToString() ?? "Could not get token.";

            logger.LogInformation("Authentication header value : {AuthHeaderValue}", tokenString);
            await this.next(context);
        }

    }
    public static class ExtensiveLoggerMiddlewareExtension {
        public static IApplicationBuilder UseExtensiveLoggerMiddleware(this IApplicationBuilder app) {
            return app.UseMiddleware<ExtensiveLoggerMiddleware>();
        }
    }
}