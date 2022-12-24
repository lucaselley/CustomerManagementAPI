using Application.Interfaces.Repositories;
using Domain.Entities;
using Infrastructure.DataContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories {
    public class AuditRepository : IAuditRepository {

        private readonly ApplicationDbContext _context;

        public AuditRepository(ApplicationDbContext context) {
            _context = context;
        }

        // Get all audited entries belongning to specified entity ID. 
        public async Task<List<AuditEntryEntity>> GetByAuditedEntityId(Guid entityId) {

            return await _context.AuditEntries.Where(auditEntity => entityId == auditEntity.EntityId).ToListAsync();

        }
    }
}
