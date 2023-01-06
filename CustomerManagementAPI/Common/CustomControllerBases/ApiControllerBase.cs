using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomerManagementAPI.Common.CustomControllerBases
{

    /// <summary>
    /// Add "between" controller and controllerbase to make controllers default to "Authorize" attribute. 
    /// </summary>
    [Authorize(AuthenticationSchemes = AzureADDefaults.BearerAuthenticationScheme)]
    [ApiController]
    public class ApiControllerBase : ControllerBase
    {
    }
}
