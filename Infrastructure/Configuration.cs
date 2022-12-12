using Application.Interfaces.Repositories;
using Infrastructure.DataContext;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure {
    public static class Configuration {


        // Add seperate method to add DbContext, to clean up program.cs file
        // Code for registering in DI registry in seperate class, gets registered when method is called through builder in program.cs
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration) {
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("Default")));

            services.AddScoped<IBusinessRepository, BusinessRepository>();
            services.AddScoped<IDepartmentRepository, DepartmentRepository>();


            return services;
        }

    }
}
