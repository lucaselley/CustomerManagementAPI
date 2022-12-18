using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomerManagementAPI.Common.CustomControllerBases
{

    //Add "between" controller and controllerbase to make controllers default to "Authorize" attribute. 

    [Authorize(AuthenticationSchemes = AzureADDefaults.BearerAuthenticationScheme)]
    [ApiController]
    public class ApiControllerBase : ControllerBase
    {
    }
}
