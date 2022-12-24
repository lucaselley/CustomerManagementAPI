using Application.Interfaces.Services;
using CustomerManagementAPI.Common.CustomControllerBases;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomerManagementAPI.Controllers {

    //CPR = CustomerPaymentRelations

    [Route("api/[controller]")]
    [ApiController]
    public class S2SController : S2SystemControllerBase {

        private readonly IBusinessService _businessService;
        private readonly IDepartmentService _departmentService;

        public S2SController(IBusinessService businessService, IDepartmentService departmentService) {
            _businessService = businessService;
            _departmentService = departmentService;
        }

        [HttpGet("business")]
        public async Task<ActionResult<List<BusinessEntity>>> GetByCvrNrs([FromQuery]List<string> cvr) {
            
            if(cvr.Count == 0) {
                return new List<BusinessEntity>();
            }

            var cvrNrs = await _businessService.GetByCvrNrs(cvr);
            return Ok(cvrNrs);

        }

        [HttpGet("departments")]
        public async Task<ActionResult<List<DepartmentEntity>>> GetByDepNrs([FromQuery] List<string> depNrs) {
            if (depNrs.Count == 0) {
                return new List<DepartmentEntity>();
            }

            var result = await _departmentService.GetByDepNrs(depNrs);

            return Ok(result);
        }
    }
}
