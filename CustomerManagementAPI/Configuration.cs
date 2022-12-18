using AspNetCore.Authentication.ApiKey;
using CustomerManagementAPI.Common.Options;
using CustomerManagementAPI.Common.S2S_Authentication;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;

namespace CustomerManagementAPI {
    public static class Configuration {

        public const string DefaultCorsPolicy = "defaultCors";

        public static IServiceCollection AddWeb(this IServiceCollection services, IConfiguration configuration) {

            //Controllers
            services.AddControllers();

            //Authentication with Azure AD - If time, replace with something thats not deprecated
            services.AddAuthentication(AzureADDefaults.BearerAuthenticationScheme)
                .AddAzureADBearer(options => configuration.Bind("AzureAd", options));

            //Configure API Key authentication (For S2S calling)
            services.AddAuthentication(ApiKeyDefaults.AuthenticationScheme)
                .AddApiKeyInHeader<ApiKeyProvider>(options => {
                    options.Realm = ApiKeyProvider.ApiKeyRealm;
                    options.KeyName = ApiKeyProvider.ApiKeyHeaderName;
                });

            //Authorization
            services.AddAuthorization();

            //Setup CORS configuration
            services.AddCors(o => o.AddPolicy(DefaultCorsPolicy, builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()));

            return services;
        }


        public static WebApplication UseWeb(this WebApplication app) {
            //Use our CORS configuration
            app.UseCors(DefaultCorsPolicy);

            app.MapControllers();

            return app;
        }
    }
}
