﻿using Domain.Entities;
using Application.Interfaces.Services;
using CustomerManagementAPI.Mappers.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CustomerManagementAPI.Common.CustomControllerBases;
using CustomerManagementAPI.Common.Attributes;

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
        [AdminAuthorize]
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
        [AdminAuthorize]
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
        [AdminAuthorize]
        public async Task<ActionResult<DepartmentEntity>> Add([FromBody]DepartmentDTO model) {

            if (model != null) {
                DepartmentEntity entity = new() {
                    DepartmentNr = model.DepartmentNr,
                    Name = model.Name,
                    _CustomerRelation = (Domain.Entities.EntityBase.EnumBaseEntity.CustomerRelation)model._CustomerRelation
                };

                await _service.Add(entity);

                return Ok();
            }
            return BadRequest();
        }

        [HttpPut("{id}")]
        [AdminAuthorize]
        public async Task<ActionResult<DepartmentEntity>> Update(DepartmentDTO model, Guid id) {

            if (model != null) {

                DepartmentEntity entity = await _service.GetById(id);

                entity.Name = model.Name; 
                entity.DepartmentNr = model.DepartmentNr;
                entity._CustomerRelation = (Domain.Entities.EntityBase.EnumBaseEntity.CustomerRelation)model._CustomerRelation;

                await _service.Update(entity);

                return Ok();

            } else 

                return BadRequest();
        }
    }
}
