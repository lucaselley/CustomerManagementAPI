using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Services;
using CustomerManagementAPI.Common.Extensions;
using CustomerManagementAPI.Common.Options;
using CustomerManagementAPI.Middleware;
using Infrastructure;
using Infrastructure.DataContext;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using System.Configuration;
using System.Runtime.CompilerServices;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

//Auhentication/Authorization
builder.Services.AddAuthentication(AzureADDefaults.BearerAuthenticationScheme)
    .AddAzureADBearer(options => builder.Configuration.Bind("AzureAd", options));

//Configure CORS
builder.Services.AddCors(o => o.AddPolicy("default", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));


//builder.Services.AddAuthentication(AzureADDefaults.BearerAuthenticationScheme)
//    .AddAzureADBearer(options => builder.Configuration.Bind("AzureAd", options));

//Add configurations
builder.Services.AddInfrastructure(builder.Configuration);

//Repositories
builder.Services.AddScoped<IBusinessRepository, BusinessRepository>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();

//Services
builder.Services.AddScoped<IBusinessService, BusinessService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();

// Options

builder.Services.AddAndValidateOptions<GroupOptions>(GroupOptions.Section, builder.Configuration);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//Identity

//var azureAdConfig = builder.Configuration.GetSection("AzureAd");

//builder.Services.AddMicrosoftIdentityWebApiAuthentication(builder.Configuration.GetSection("AzureAd"));




var app = builder.Build();


// Our custom errorhandling middleware

app.UseExtensiveLoggerMiddleware();
app.UseErrorHandlingMiddleware();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("default");
app.UseHttpsRedirection();


//TODO: Read up on this
app.UseAuthentication();
app.UseAuthorization();

app.Use(async (context, next) => {
    if (!context.User.Identity?.IsAuthenticated ?? false) {
        context.Response.StatusCode = 401;
        await context.Response.WriteAsync("Not Authenticated");
    }
    else
        await next();
});

app.MapControllers();

app.Run();
