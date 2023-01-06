using Application.Interfaces.Services;
using CustomerManagementAPI.Common.Attributes;
using CustomerManagementAPI.Common.CustomControllerBases;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomerManagementAPI.Controllers {


    [Route("api/[controller]")]
    [ApiController]
    public class AuditController : ApiControllerBase {

        private readonly IAuditService _service;

        public AuditController(IAuditService service) {
            _service = service;
        }

        [HttpGet("{id}")]
        [AdminAuthorize]
        public async Task<ActionResult<List<AuditEntryEntity>>> GetByAuditedEntityId(Guid id) {

            var result = await _service.GetByAuditedEntityId(id);

            return Ok(result);
        }
    }
}
