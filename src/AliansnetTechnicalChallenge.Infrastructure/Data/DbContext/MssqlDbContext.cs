using AliansnetTechnicalChallenge.Core.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Infrastructure.Data.DbContext
{
    public class MssqlDbContext: IdentityDbContext<AppUser, AppRole, string>
    {

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductAudit> ProductAudits { get; set; }

        public MssqlDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
