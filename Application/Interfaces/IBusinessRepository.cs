﻿using Application.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces {
    public interface IBusinessRepository {
        public Task<IEnumerable<BusinessEntity>> GetAll();
        public Task<BusinessEntity> GetById(Guid id);
        public Task<BusinessEntity> GetByName(string name);
        public Task<BusinessEntity> Delete(Guid id);
        public Task<BusinessEntity> Update(BusinessEntity entity);
        public Task<BusinessEntity> Add(BusinessEntity entity);
    }
}
