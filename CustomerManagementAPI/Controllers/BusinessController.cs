using Domain.Entities;
using Application.Interfaces.Services;
using CustomerManagementAPI.Common.Attributes;
using CustomerManagementAPI.Mappers.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using CustomerManagementAPI.Common.CustomControllerBases;

namespace CustomerManagementAPI.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class BusinessController : ApiControllerBase {

        private readonly IBusinessService _service;

        public BusinessController(IBusinessService service) {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessEntity>>> GetAll() {

            var data = await _service.GetAll();

            if (data != null) {
                return Ok(data);
            } 
            else return NotFound();

        }

        [HttpGet("{id}")]
        [AdminAuthorize]
        public async Task<ActionResult<BusinessEntity>> GetById(Guid id) {

            var entity = await _service.GetById(id);

            if (entity != null)
                return Ok(entity);
            return NotFound();
        }

        [HttpPost]
        [AdminAuthorize]
        public async Task<ActionResult<BusinessEntity>> Add(BusinessDTO model) {

            BusinessEntity entity = new() {
                Name = model.Name,
                CVRnr = model.CVRnr,
                _CustomerRelation = (Domain.Entities.EntityBase.EnumBaseEntity.CustomerRelation)model._CustomerRelation
            };

            await _service.Add(entity);

            return Ok();
        }

        [HttpDelete("{id}")]
        [AdminAuthorize]
        public async Task<ActionResult<BusinessEntity>> Delete(Guid id) {

            var result = await _service.Delete(id);

            if (result != null)
                return Ok();
            return BadRequest();
        }

        [HttpPut("{id}")]
        [AdminAuthorize]
        public async Task<ActionResult<BusinessEntity>> Update(BusinessDTO model, Guid id) {

            if (model != null) {
                BusinessEntity entity = await _service.GetById(id);

                entity.Name = model.Name;
                entity.CVRnr = model.CVRnr;
                entity._CustomerRelation = (Domain.Entities.EntityBase.EnumBaseEntity.CustomerRelation)model._CustomerRelation;

                await _service.Update(entity);
                return Ok();
            }
            else return BadRequest();



        }
    }
}
