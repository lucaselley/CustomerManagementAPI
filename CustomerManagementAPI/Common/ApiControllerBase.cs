using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomerManagementAPI.Common {

    //Add "between" controller and controllerbase to make controllers default to "Authorize" attribute. 

    [Authorize]
    [ApiController]
    public class ApiControllerBase : ControllerBase {
    }
}
