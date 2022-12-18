using Domain.Common.Interface;
using Domain.Entities;
using Domain.Entities.EntityBase;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.DataContext {
    public class ApplicationDbContext : DbContext {

        //To access the user for audit purposes
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IHttpContextAccessor httpContextAccessor) : base(options) {
            this._httpContextAccessor = httpContextAccessor;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
            base.OnModelCreating(modelBuilder);

        }

        //DB Sets
        public DbSet<BusinessEntity> Businesses { get; set; }
        public DbSet<DepartmentEntity> Departments { get; set; }
        public DbSet<AuditEntryEntity> AuditEntries { get; set; }


        
        public override int SaveChanges() {
            this.ApplyDefaults();

            var auditEntities = this.CreateAuditEntities();
            var result = base.SaveChanges();
            this.OnAfterSaveChanges(auditEntities);
            return result;
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken) {

            this.ApplyDefaults();

            var auditEntities = this.CreateAuditEntities();
            var result = await base.SaveChangesAsync(cancellationToken);

            await this.OnAfterSaveChangesAsync(auditEntities, cancellationToken);

            return result;
        }

        private IEnumerable<AuditEntryEntity> CreateAuditEntities() {
            return this.ChangeTracker.Entries()
                .Where(entry => entry.Entity is IAuditable && entry.State switch {

                    // Filter out detached or unchanged entities
                    EntityState.Detached or EntityState.Unchanged => false,
                    _ => true,
                }).Select(entry => new AuditEntryEntity(
                    entity: entry.Metadata.ClrType.Name,
                    entityId: Guid.TryParse(entry.Properties.Single(property => property.Metadata.IsPrimaryKey())?.ToString(), out var id) ? id : Guid.Empty,
                    action: entry.State == EntityState.Added ? "INSERT" : entry.State == EntityState.Deleted ? "DELETE" : "UPDATE",
                    actor: this._httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(claim => claim.Type.Equals(ClaimTypes.Name, StringComparison.OrdinalIgnoreCase))?.Value ?? "Unknown",
                    changes: entry.Properties.Select(property => new { property.Metadata.Name, property.CurrentValue }).ToDictionary(i => i.Name, i => i.CurrentValue),
                    tempProperties: entry.Properties.Where(p => p.IsTemporary).ToList()
                    )).ToList();
        }


        //Apply default values to entities, but only if they inherit from baseentity class
        private void ApplyDefaults() {
            var now = DateTimeOffset.UtcNow;
            foreach (var changedEntity in this.ChangeTracker.Entries()) {
                if (changedEntity.Entity.GetType().IsSubclassOf(typeof(BaseEntity))) {
                    switch (changedEntity.State) {
                        case EntityState.Added:
                            changedEntity.Property(nameof(BaseEntity.Id)).CurrentValue = Guid.NewGuid();
                            changedEntity.Property(nameof(BaseEntity.CreatedDate)).CurrentValue = now;
                            changedEntity.Property(nameof(BaseEntity.UpdatedDate)).CurrentValue = now;
                            break;
                        case EntityState.Modified:
                            changedEntity.Property(nameof(BaseEntity.UpdatedDate)).CurrentValue = now;
                            break;
                        case EntityState.Detached:
                        case EntityState.Unchanged:
                        case EntityState.Deleted:
                            break;
                        default:
                            throw new ArgumentOutOfRangeException();
                    }
                }
            }
        }

        //Apply database generated values to audit entry before saving them
        private static IEnumerable<AuditEntryEntity> OnAfterSave(IEnumerable<AuditEntryEntity> auditEntities) {
            foreach (var entity in auditEntities) {
                if(entity.TempProperties is null) {
                    continue;
                }
                foreach(var prop in (List<PropertyEntry>)entity.TempProperties) {
                    if(prop.Metadata.IsPrimaryKey()) {
                        entity.EntityId = Guid.TryParse(prop.CurrentValue?.ToString(), out var id) ? id : Guid.Empty;
                    }
                    entity.Changes[prop.Metadata.Name] = prop.CurrentValue;
                }
            }
            return auditEntities;
        }

        //Apply database generated values on audit entities and save changes after
        private void OnAfterSaveChanges(IEnumerable<AuditEntryEntity> auditEntryEntities) {
            if(!auditEntryEntities.Any()) {
                return;
            }

            this.AuditEntries.AddRange(OnAfterSave(auditEntryEntities));

            base.SaveChanges();
        }

        // Apply database generated values on audit entities and save changes async.
        private Task OnAfterSaveChangesAsync(IEnumerable<AuditEntryEntity> auditEntries, CancellationToken cancellationToken = default) {

            if(!auditEntries.Any()) {
                return Task.CompletedTask;
            }

            this.AuditEntries.AddRange(OnAfterSave(auditEntries));
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
