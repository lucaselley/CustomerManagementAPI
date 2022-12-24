using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Services {
    public interface IDepartmentService {

        public Task<IEnumerable<DepartmentEntity>> GetAll();
        public Task<DepartmentEntity> GetById(Guid id);
        public Task<List<DepartmentEntity>> GetByDepNrs(List<string> depNrs);
        public Task<DepartmentEntity> Delete(Guid id);
        public Task<DepartmentEntity> Update(DepartmentEntity entity);
        public Task<DepartmentEntity> Add(DepartmentEntity entity);
    }
}
