
using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.DataContext;
using Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories {
    public class BusinessRepository : IBusinessRepository {

        private readonly ApplicationDbContext _dbContext;
        private readonly CancellationToken cancellationToken = new CancellationToken();

        public BusinessRepository(ApplicationDbContext _context) {
            _dbContext = _context;
        }

        public async Task<BusinessEntity> Delete(Guid id) {
            var exists = await _dbContext.Businesses.AnyAsync(x => x.Id == id);

            if (exists) {
                var entity = await _dbContext.Businesses.FirstOrDefaultAsync(x => x.Id == id);
                DeleteEntity(entity);
                await _dbContext.SaveChangesAsync(cancellationToken);
                return entity;
            }
            else {
                throw new NotFoundException($"Business entity not found with {id}");
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
                throw new NotFoundException($"Business entity not found with {id}");
            }
        }

        //Return business' where business entity's cvr nr is included in the list of cvr nrs in the request
        public async Task<List<BusinessEntity>> GetByCvrNrs(List<string> cvrNrs) {
            var result = await _dbContext.Businesses.Where(business => cvrNrs.Contains(business.CVRnr)).ToListAsync();

            return result;
        }

        public async Task<BusinessEntity> Update(BusinessEntity entity) {

            if (entity != null) {
                UpdateBusiness(entity);
                await _dbContext.SaveChangesAsync(cancellationToken);

                return entity;
            }
            throw new NotFoundException($"Department entity not found");
        }

        //TODO: Maybe void, no need to return
        public async Task<BusinessEntity> Add(BusinessEntity entity) {


            await _dbContext.Businesses.AddAsync(entity);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return entity;
        }

        public void UpdateBusiness(BusinessEntity entity) {
            _dbContext.Businesses.Update(entity);
        }
    }

}
