using Domain.Entities;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services {
    public class BusinessService : IBusinessService {

        private readonly IBusinessRepository _repo;
        public BusinessService(IBusinessRepository repo) {
            _repo = repo;
        }

        public async Task<BusinessEntity> Add(BusinessEntity entity)
            => await _repo.Add(entity);

        public async Task<BusinessEntity> Delete(Guid id) 
            => await _repo.Delete(id);

        public async Task<IEnumerable<BusinessEntity>> GetAll() 
            => await _repo.GetAll();

        public async Task<BusinessEntity> GetById(Guid id) 
            => await _repo.GetById(id);

        public async Task<List<BusinessEntity>> GetByCvrNrs(List<string> cvrNrs)
            => await _repo.GetByCvrNrs(cvrNrs);

        public async Task<BusinessEntity> Update(BusinessEntity entity) 
            => await _repo.Update(entity);
    }
}
