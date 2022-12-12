using Domain.Entities;
using Application.Interfaces.Repositories;
using Infrastructure.DataContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class DepartmentRepository : IDepartmentRepository {

        private readonly ApplicationDbContext _dbContext;

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

                await _dbContext.SaveChangesAsync();
                return entity;
            }
            else {

                //TODO: ErrorHandling
                return null;
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
                //TODO: ErrorHandling
                return null;
            }

        }


        //TODO: GetByName
        public Task<DepartmentEntity> GetByName(string name) {
            throw new NotImplementedException();
        }

        public async Task<DepartmentEntity> Add(DepartmentEntity entity) {

            await _dbContext.AddAsync(entity);
            await _dbContext.SaveChangesAsync();

            return entity;
        }

        public async Task<DepartmentEntity> Update(DepartmentEntity entity) {

            //if (entity != null) {
            //    _dbContext.Entry(entity).State = EntityState.Modified;
            //    return entity;
            //}

            _dbContext.Departments.Update(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }
    }
}
