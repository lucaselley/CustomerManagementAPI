using AspNetCore.Authentication.ApiKey;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CustomerManagementAPI.Common.CustomControllerBases {

    [ApiController]
    [Authorize(AuthenticationSchemes = ApiKeyDefaults.AuthenticationScheme)]
    public class S2SystemControllerBase : ControllerBase {
    }
}
