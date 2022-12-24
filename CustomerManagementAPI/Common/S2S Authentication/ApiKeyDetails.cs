using AspNetCore.Authentication.ApiKey;
using System.Security.Claims;

namespace CustomerManagementAPI.Common.S2S_Authentication {
    public class ApiKeyDetails : IApiKey {

        public ApiKeyDetails(string key, string ownerName) {
            this.Key = key;
            this.OwnerName = ownerName;
        }

        //Only provide "get", as set should never be an option
        public string Key { get; }

        public string OwnerName { get; }

        //Can theoretically be used as a way to add policies/roles to users. Not used in our case, but is required by the IApiKey interface. 
        public IReadOnlyCollection<Claim> Claims { get; } = Array.Empty<Claim>();
    }
}
