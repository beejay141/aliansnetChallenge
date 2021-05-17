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
    public class ProductEntityConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
           
            builder.Property(c => c.Id).ValueGeneratedOnAdd();
            builder.Property(c => c.Name).IsRequired().HasMaxLength(50);
            builder.Property(c => c.Price).IsRequired().HasColumnType("decimal(24,2)");
            builder.Property(c => c.CreatedAt).HasDefaultValueSql("GETDATE()");
            builder.Property(c => c.UpdatedAt).HasDefaultValueSql("GETDATE()");

            builder.HasMany<ProductAudit>()
                .WithOne()
                .HasForeignKey(c => c.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(c => new { c.UserId, c.Name });
            builder.HasIndex(c => new { c.UserId, c.RecordStatus });
            builder.HasIndex(c => new { c.UserId, c.Name, c.RecordStatus});
        }
    }
}
