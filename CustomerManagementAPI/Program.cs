using Domain;
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
using CustomerManagementAPI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle


//Makes user available in whole project, instead of having to pass it around
builder.Services.AddHttpContextAccessor();

//Add configurations
builder.Services.AddWeb(builder.Configuration);
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);



// Options - Comparing groups to defined "accepted" group id's from appsettings

builder.Services.AddAndValidateOptions<GroupOptions>(GroupOptions.Section, builder.Configuration);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Our custom errorhandling middleware
app.UseExtensiveLoggerMiddleware();
app.UseErrorHandlingMiddleware();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

//Custom Configuration
app.UseWeb();
app.Run();
