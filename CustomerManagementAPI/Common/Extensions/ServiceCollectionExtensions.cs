using Microsoft.Extensions.Options;

namespace CustomerManagementAPI.Common.Extensions {
    public static class ServiceCollectionExtensions {

        //Bind model to app settings section, gets registered in DI registry
        //Validate data annotions to give better feedback in case something goes wrong(in app settings) when starting up

        public static OptionsBuilder<TOptions> AddAndValidateOptions<TOptions>(this IServiceCollection services,
        string sectionKey, ConfigurationManager configuration) where TOptions : class {
            return services.AddOptions<TOptions>().Bind(configuration.GetSection(sectionKey)).ValidateDataAnnotations().ValidateOnStart();
        }

    }
}
