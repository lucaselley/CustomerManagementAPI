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

        public async Task<IApiKey?> ProvideAsync(string key) {
            return await Task.Run(() => key.Equals(this.Configuration.GetValue<string>(ApiKeyConfigurationName), StringComparison.Ordinal) ? new ApiKeyDetails(key, "System") : null);
        }
    }
}
