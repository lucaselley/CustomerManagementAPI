using Domain.Entities;
using Infrastructure.Database.EntityTypeBuilderExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Database.EntityConfiguration
{
    public class AuditEntryConfiguration : IEntityTypeConfiguration<AuditEntryEntity> {
        public void Configure(EntityTypeBuilder<AuditEntryEntity> builder) {

            builder.UseBaseEntityConfiguration();

            builder.Property(x => x.Changes).HasJsonConversion();

            builder.Ignore(x => x.TempProperties);
        }
    }
}
