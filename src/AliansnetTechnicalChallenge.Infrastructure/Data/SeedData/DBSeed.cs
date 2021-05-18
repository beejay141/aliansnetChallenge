using AliansnetTechnicalChallenge.Core.Entities;
using AliansnetTechnicalChallenge.Infrastructure.Data.DbContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Infrastructure.Data.SeedData
{
    public class DBSeed
    {
        public static async Task Initialize(IServiceProvider provider)
        {
            var _context = provider.GetRequiredService<MssqlDbContext>();
            _context.Database.EnsureCreated();

            var userManager = provider.GetRequiredService<UserManager<AppUser>>();
            var admin = await userManager.FindByEmailAsync("admin@gmail.com");
            if ( admin == null)
            {
                admin = new AppUser
                {
                    Email = "admin@gmail.com",
                    NormalizedEmail = "ADMIN@GMAIL.COM",
                    EmailConfirmed = true,
                    FirstName = "John",
                    LastName = "Doe",
                    UserName = "admin",
                    NormalizedUserName = "ADMIN"
                };

                var result = await userManager.CreateAsync(admin, "admin1234");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "Admin");
                }
            }
        }
    }
}
