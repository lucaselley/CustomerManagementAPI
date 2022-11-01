using Application.Entities;
using Application.Interfaces.Services;
using CustomerManagementAPI.Mappers.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

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

        [HttpGet("{id}")]
        public async Task<ActionResult<BusinessEntity>> GetById(Guid id) {
            
            var entity = await _service.GetById(id);

            if(entity != null)
                return Ok(entity);
            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<BusinessEntity>> Add(BusinessDTO model) {

            BusinessEntity entity = new() {
                Name = model.Name,
                CVRnr = model.CVRnr
            };   
            
            await _service.Add(entity);
            
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BusinessEntity>> Delete(Guid id) {

            var result = await _service.Delete(id);

            if (result != null)
                return Ok();
            return BadRequest();
        }

        //[HttpPut] 
        //public async Task<ActionResult<BusinessEntity>> Update(BusinessDTO model) {


        //    if(ModelState.IsValid) 
        //        await _service.Update(entity);
        //    return Ok(entity);
            
        //}
    }
}
