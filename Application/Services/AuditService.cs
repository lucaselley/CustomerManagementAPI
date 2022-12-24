using Application.Interfaces.Repositories;
using Application.Interfaces.Services;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services {
    public class AuditService : IAuditService {

        private readonly IAuditRepository _repo;

        public AuditService(IAuditRepository repo) {
            _repo = repo;
        }

        public async Task<List<AuditEntryEntity>> GetByAuditedEntityId(Guid id)
            => await _repo.GetByAuditedEntityId(id);
    }
}
