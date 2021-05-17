using AliansnetTechnicalChallenge.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Infrastructure.Data.EntityConfigurations
{
    class AppRoleEntityConfiguration : IEntityTypeConfiguration<AppRole>
    {
        public void Configure(EntityTypeBuilder<AppRole> builder)
        {
            builder.Property(c => c.DisplayName).HasMaxLength(20);

            builder.HasData(
                new AppRole() { Name = "Admin", NormalizedName = "ADMIN", DisplayName = "Administrator" },
                new AppRole() { Name = "Worker", NormalizedName = "WORKER", DisplayName = "Worker" }
                );
        }
    }
}
