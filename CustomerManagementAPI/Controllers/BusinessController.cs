using Application.Entities;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomerManagementAPI.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class BusinessController : ControllerBase {

        private readonly IBusinessService _service;

        public BusinessController(IBusinessService service) {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessEntity>>> GetAll() {
            
            var data = await _service.GetAll();

            return Ok(data);
        }
    }
}
