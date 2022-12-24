using AspNetCore.Authentication.ApiKey;

namespace CustomerManagementAPI.Common.S2S_Authentication {
    public class ApiKeyProvider : IApiKeyProvider {

        private readonly IConfiguration Configuration;

        public ApiKeyProvider(IConfiguration configuration) { 
            this.Configuration = configuration;
        }

        public const string ApiKeyConfigurationName = "ApiKey";
        public const string ApiKeyHeaderName = "x-api-key";
        public const string ApiKeyRealm = "CustomerManagementAPI";

        //Use built in Asp.Net core nuget package, implement "ProvideAsync" method from interface IApiKeyProvider
        public async Task<IApiKey?> ProvideAsync(string key) {
            return await Task.Run(() => 
            //If key.Equals returns true(incoming ApiKey === "Test123" from appsettings), use code on left side from :, if false use right side. 
            key.Equals(this.Configuration.GetValue<string>(ApiKeyConfigurationName), StringComparison.Ordinal) ? 
            new ApiKeyDetails(key, "System") : null);
        }
    }
}
