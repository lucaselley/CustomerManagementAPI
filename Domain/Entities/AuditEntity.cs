using Domain.Entities.EntityBase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities {
    public class AuditEntryEntity : BaseEntity {

        // For logging of changes to entities

        // Name of audited entity
        public string Entity { get; set; }


        // Audited entity's ID
        public Guid EntityId { get; set; }

        //Type of action performed on the entity(Delete, Update, Add etc.)
        public string Action { get; set; }

        // Responsible acur/user for the change
        public string? Actor { get; set; }

        //Changes to the entity
        public Dictionary<string, object?> Changes { get; set; }

        // TempProperties are used for properties that are only generated on save, e.g. ID's
        public object? TempProperties { get; set; }

        public AuditEntryEntity() {
            this.Entity = string.Empty;
            this.Action = string.Empty;
            this.Changes = new Dictionary<string, object?>();
        }

        public AuditEntryEntity(string entity, Guid entityId, string action, string actor, Dictionary<string, object?> changes, object tempProperties) {
            this.Entity = entity;
            this.EntityId = entityId;
            this.Action = action;
            this.Actor = actor;
            this.Changes = changes;
            this.TempProperties = tempProperties;
        }
    }
}
