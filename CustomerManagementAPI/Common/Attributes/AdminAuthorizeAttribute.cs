using CustomerManagementAPI.Common.Options;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using System.Globalization;
using System.Security.Claims;

namespace CustomerManagementAPI.Common.Attributes {

    // multiuse attribute  
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class AdminAuthorizeAttribute : AuthorizeAttribute, IAuthorizationFilter {
        public void OnAuthorization(AuthorizationFilterContext context) {

            var user = context.HttpContext.User;

            if (user.Identity == null) {
                context.Result = new StatusCodeResult((int)System.Net.HttpStatusCode.Forbidden);
                return;
            }

            if (!user.Identity.IsAuthenticated) {
                context.Result = new StatusCodeResult((int)System.Net.HttpStatusCode.Forbidden);
                return;
            }

            var groupOptionsService = context.HttpContext.RequestServices.GetService<IOptions<GroupOptions>>();
            var groupOptions = groupOptionsService.Value;

            //Check through list of claims, looking for a key value pair with key "Groups" and a value

            var claimsIdentity = (ClaimsIdentity?)context.HttpContext.User.Identity;

            if (claimsIdentity == null) {
                context.Result = new StatusCodeResult((int)System.Net.HttpStatusCode.Forbidden);
                return;
            }

            var hasAdminUserGroup = claimsIdentity.Claims
                .FirstOrDefault(claim => claim.Type == "groups" && claim.Value == groupOptions.Admin) != null;

            if (hasAdminUserGroup) {
                return;
            }

            //Will always default to unauthorized
            context.Result = new StatusCodeResult((int)System.Net.HttpStatusCode.Forbidden);
            return;
        }
    }
}


