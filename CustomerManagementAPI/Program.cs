using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Services;
using Infrastructure.DataContext;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using System.Configuration;

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

var azureAdConfig = builder.Configuration.GetSection("AzureAd");

builder.Services.AddMicrosoftIdentityWebApiAuthentication(azureAdConfig);













var app = builder.Build();

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
app.UseAuthentication();

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
