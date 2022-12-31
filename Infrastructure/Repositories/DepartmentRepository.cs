﻿using Domain.Entities;
using Application.Interfaces.Repositories;
using Infrastructure.DataContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Infrastructure.Exceptions;

namespace Infrastructure.Repositories
{
    public class DepartmentRepository : IDepartmentRepository {

        private readonly ApplicationDbContext _dbContext;
        private readonly CancellationToken cancellationToken = new CancellationToken();

        public DepartmentRepository(ApplicationDbContext context) {
            _dbContext = context;
        }

        public async Task<DepartmentEntity> Delete(Guid id) {

            //Check if id exists in DB
            var exists = await _dbContext.Departments.AnyAsync(x => x.Id == id);

            //If ID exists in DB, do this
            if (exists) {
                //Select entity to be deleted
                var entity = await _dbContext.Departments.FirstOrDefaultAsync(x => x.Id == id);

                //Delete
                DeleteEntity(entity);

                await _dbContext.SaveChangesAsync(cancellationToken);
                return entity;
            }
            else {
                throw new NotFoundException($"Department entity not found with {id}");
            }
        }

        public void DeleteEntity(DepartmentEntity entity)
            => _dbContext.Departments.Remove(entity);

        public async Task<IEnumerable<DepartmentEntity>> GetAll()
            => await _dbContext.Departments.ToListAsync();


        public async Task<DepartmentEntity> GetById(Guid id) {

            var exists = await _dbContext.Departments.AnyAsync(x => x.Id == id);

            if (exists) {
                var entity = await _dbContext.Departments.FirstOrDefaultAsync(x => x.Id == id);
                return entity;
            }
            else {
                throw new NotFoundException($"Department entity not found with {id}");
            }

        }


        public async Task<List<DepartmentEntity>> GetByDepNrs(List<string> depNrs) {
            var result = await _dbContext.Departments.Where(department => depNrs.Contains(department.DepartmentNr)).ToListAsync();

            return result;
        }

        public async Task<DepartmentEntity> Add(DepartmentEntity entity) {

            await _dbContext.AddAsync(entity);
            await _dbContext.SaveChangesAsync(cancellationToken);

            return entity;
        }

        public async Task<DepartmentEntity> Update(DepartmentEntity entity) {

            //if (entity != null) {
            //    _dbContext.Entry(entity).State = EntityState.Modified;
            //    return entity;
            //}

            if (entity != null) {
                UpdateDepartment(entity);
                await _dbContext.SaveChangesAsync(cancellationToken);
                return entity;
            }
            throw new NotFoundException($"Department entity not found");
        }

        public void UpdateDepartment(DepartmentEntity entity) {
            _dbContext.Departments.Update(entity);
        }
    }
}
