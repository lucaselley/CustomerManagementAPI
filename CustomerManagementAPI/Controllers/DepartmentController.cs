using Domain.Entities;
using Application.Interfaces.Services;
using CustomerManagementAPI.Mappers.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CustomerManagementAPI.Common.CustomControllerBases;

namespace CustomerManagementAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ApiControllerBase {

        private readonly IDepartmentService _service;

        public DepartmentController(IDepartmentService service) {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentEntity>>> GetAll() {
            var data = await _service.GetAll();

            if (data != null) {
                return Ok(data);
            }
            else {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentEntity>> GetById(Guid id) {

            var data = await _service.GetById(id);

            if (data != null) {
                return Ok(data);
            }
            else {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<DepartmentEntity>> Delete(Guid id) {

            var data = await _service.Delete(id);

            if (data != null) {
                return Ok();
            }
            else {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<ActionResult<DepartmentEntity>> Add(DepartmentDTO model) {

            if (model != null) {
                DepartmentEntity entity = new() {
                    DepartmentNr = model.DepartmentNr,
                    Name = model.Name
                };

                await _service.Add(entity);

                return Ok();
            }
            return BadRequest();
        }

        [HttpPut]
        public async Task<ActionResult<DepartmentEntity>> Update(DepartmentDTO model) {

            if (model != null) {
                DepartmentEntity entity = new() {
                    Name = model.Name,
                    DepartmentNr = model.DepartmentNr
                };
                await _service.Update(entity);

                return Ok();
            } else 
                return BadRequest();
        }
    }
}
