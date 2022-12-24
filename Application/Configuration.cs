using Application.Interfaces.Services;
using Application.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain {
    public static class Configuration {

        public static IServiceCollection AddApplication(this IServiceCollection services) {
            services.AddScoped<IBusinessService, BusinessService>();
            services.AddScoped<IDepartmentService, DepartmentService>();
            services.AddScoped<IAuditService, AuditService>();

            return services;
        }
    }
}
