using Domain.Entities.EntityBase;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Database.EntityTypeBuilderExtensions {
    public static class EntityTypeBuilderExtensions {

        public static EntityTypeBuilder<T> UseBaseEntityConfiguration<T>(this EntityTypeBuilder<T> builder) where T : class {

            builder.HasKey(nameof(BaseEntity.Id));
            builder.Property(nameof(BaseEntity.Id)).IsRequired();

            builder.Property(nameof(BaseEntity.CreatedDate)).IsRequired();
            builder.Property(nameof(BaseEntity.UpdatedDate)).IsRequired();

            return builder;
        }
    }
}
