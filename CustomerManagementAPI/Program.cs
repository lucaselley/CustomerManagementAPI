using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Services;
using Infrastructure.DataContext;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using System.Configuration;
using System.Runtime.CompilerServices;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle


//DependencyInjection

//DbContext
builder.Services.AddDbContext<ApplicationDbContext>();

//Repositories
builder.Services.AddScoped<IBusinessRepository, BusinessRepository>();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();

//Services
builder.Services.AddScoped<IBusinessService, BusinessService>();
builder.Services.AddScoped<IDepartmentService, DepartmentService>();




builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//Identity

//var azureAdConfig = builder.Configuration.GetSection("AzureAd");

//builder.Services.AddMicrosoftIdentityWebApiAuthentication(builder.Configuration.GetSection("AzureAd"));


//Auhentication/Authorization
//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//        .AddMicrosoftIdentityWebApi(
//        (jwtOptions) => {
//            // The claim in the Jwt token where App roles are available. (e.g. you setuo in AZURE AD use groups claims instead roles.)
//            // jwtOptions.TokenValidationParameters.RoleClaimType = "groups";
//        },
//        (options) => {
//            //Configuration is IConfiguration type stored as local property in Startup filled with Ctor injection.
//            options.ClientId = builder.Configuration["AzureAd:ClientId"];
//            options.TenantId = builder.Configuration["AzureAd:TenantId"];
//            options.Domain = builder.Configuration["AzureAd:Domain"];
//            options.Instance = builder.Configuration["AzureAd:Instance"];
            
//        });


var app = builder.Build();


// Our custom errorhandling middleware
app.UseErrorHandlingMiddleware();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(x => x
.AllowAnyOrigin()
.AllowAnyMethod()
.AllowAnyHeader());
app.UseHttpsRedirection();


//TODO: Read up on this
app.UseAuthorization();
//app.UseAuthentication();

//app.Use(async (context, next) => {
//    if (!context.User.Identity?.IsAuthenticated ?? false) {
//        context.Response.StatusCode = 401;
//        await context.Response.WriteAsync("Not Authenticated");
//    }
//    else
//        await next();
//});

app.MapControllers();

app.Run();
