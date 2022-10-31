using Application.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces.Repositories
{
    public interface IDepartmentRepository
    {
        public Task<IEnumerable<DepartmentEntity>> GetAll();
        public Task<DepartmentEntity> GetById(Guid id);
        public Task<DepartmentEntity> GetByName(string name);
        public Task<DepartmentEntity> Delete(Guid id);
        public Task<DepartmentEntity> Update(DepartmentEntity entity);

        public Task<DepartmentEntity> Add(DepartmentEntity entity);
    }
}
