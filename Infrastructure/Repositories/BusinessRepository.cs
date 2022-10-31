using Application.Entities;
using Application.Interfaces;
using Infrastructure.DataContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories {
    public class BusinessRepository : IBusinessRepository {

        private readonly ApplicationDbContext _dbContext;

        public BusinessRepository(ApplicationDbContext _context) {
            _dbContext = _context;
        }

        public async Task<BusinessEntity> Delete(Guid id) {
            var exists = await _dbContext.Businesses.AnyAsync(x => x.Id == id);

            if (exists) {
                var entity = await _dbContext.Businesses.FirstOrDefaultAsync(x => x.Id == id);
                DeleteEntity(entity);
                await _dbContext.SaveChangesAsync();
                return entity;
            }
            else {
                return null;
            }
        }

        public void DeleteEntity(BusinessEntity entity)
            => _dbContext.Businesses.Remove(entity);

        public async Task<IEnumerable<BusinessEntity>> GetAll()
            => await _dbContext.Businesses.ToListAsync();


        public async Task<BusinessEntity> GetById(Guid id) {

            var exists = await _dbContext.Businesses.AnyAsync(x => x.Id == id);

            if (exists) {
                var entity = await _dbContext.Businesses.FirstOrDefaultAsync(x => x.Id == id);
                return entity;
            }
            else {
                //TODO: ErrorHandling
                return null;
            }
        }

        public Task<BusinessEntity> GetByName(string name) {
            throw new NotImplementedException();
        }

        public async Task<BusinessEntity> Update(BusinessEntity entity) {
            _dbContext.Entry(entity).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return entity;
        }

        //TODO: Maybe void, no need to return
        public async Task<BusinessEntity> Add(BusinessEntity entity) {

            await _dbContext.Businesses.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }
    }
}
