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
    public class BusinessEntityConfiguration : IEntityTypeConfiguration<BusinessEntity> {
        public void Configure(EntityTypeBuilder<BusinessEntity> builder) {
            builder.UseBaseEntityConfiguration();
        }

    }
}
