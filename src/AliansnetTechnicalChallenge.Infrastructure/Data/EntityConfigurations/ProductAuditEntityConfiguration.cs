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
    public class ProductAuditEntityConfiguration : IEntityTypeConfiguration<ProductAudit>
    {
        public void Configure(EntityTypeBuilder<ProductAudit> builder)
        {
            builder.Property(b => b.Description).IsRequired().HasMaxLength(250);
            builder.Property(b => b.CreatedAt).HasDefaultValueSql("GETDATE()");
        }
    }
}
