using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Application.Services;
using Infrastructure.DataContext;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

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

app.UseAuthorization();

app.MapControllers();

app.Run();
