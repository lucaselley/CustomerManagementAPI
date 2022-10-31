using Application.Entities;
using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services {
    public class DepartmentService : IDepartmentService {

        private readonly IDepartmentRepository _repo;

        public DepartmentService(IDepartmentRepository repo) {
            _repo = repo;
        }

        public async Task<DepartmentEntity> Add(DepartmentEntity entity)
            => await _repo.Add(entity);

        public async Task<DepartmentEntity> Delete(Guid id)
            => await _repo.Delete(id);

        public async Task<IEnumerable<DepartmentEntity>> GetAll()
            => await _repo.GetAll();

        public async Task<DepartmentEntity> GetById(Guid id)
            => await _repo.GetById(id);

        public async Task<DepartmentEntity> GetByName(string name)
            => await _repo.GetByName(name);

        public async Task<DepartmentEntity> Update(DepartmentEntity entity)
            => await _repo.Update(entity);
    }
}
