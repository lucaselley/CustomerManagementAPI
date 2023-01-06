using Domain.Entities;
using Infrastructure.Database.EntityTypeBuilderExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Database.EntityConfiguration {
    public class DepartmentEntityConfiguration : IEntityTypeConfiguration<DepartmentEntity> {
        public void Configure(EntityTypeBuilder<DepartmentEntity> builder) {
            builder.UseBaseEntityConfiguration();

        }
    }
}
