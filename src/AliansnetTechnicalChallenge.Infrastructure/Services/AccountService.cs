using AliansnetTechnicalChallenge.Core.Entities;
using AliansnetTechnicalChallenge.Core.Interfaces;
using AliansnetTechnicalChallenge.Core.Interfaces.Helpers;
using AliansnetTechnicalChallenge.Core.Interfaces.Repositories;
using AliansnetTechnicalChallenge.Core.Models.Requests;
using AliansnetTechnicalChallenge.Core.Models.Requests.Auth;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Infrastructure.Services
{
    public class AccountService : IAccountService
    {
        private readonly IRepository<AppUser, string> repository;
        private readonly UserManager<AppUser> userManager;
        private readonly ISettings settings;
        private readonly IApplogger logger;
        private readonly IMapper mapper;

        public AccountService(IRepository<AppUser,string> repository,UserManager<AppUser> userManager, ISettings settings, IApplogger logger, IMapper mapper)
        {
            this.repository = repository;
            this.userManager = userManager;
            this.settings = settings;
            this.logger = logger;
            this.mapper = mapper;
        }

        public async Task<(AppUser user, string[] errors)> CreateUser(AppUser newUser, string password)
        {
            try
            {
                var result = await userManager.CreateAsync(newUser, password );
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(newUser, settings.GetString("default_role","Worker"));
                    return (newUser, null);
                }
                var errors = ParseModelError(result);

                return (null, errors);
            }
            catch (Exception ex)
            {
                _ = logger.ErrorAsync($"An error occurred while creating new user: {ex}");
                return (null, new string[] { "Unexpected Error has occured" });
            }
        }

        public async Task<List<AppUser>> GetUsers(Func<AppUser, bool> filter, int skip = 0, int? take = null, bool sortIt = true)
        {
            return await repository.FindAllAsync(filter, skip, take, c=>c.CreatedAt);
        }

        public async Task<AppUser> GetUserWithContextUser(ClaimsPrincipal User)
        {
            return await userManager.GetUserAsync(User);
        }

        public async Task<(AuthPayload user, string error)> ValidateUserCredentials(string email, string password)
        {
            var user = await userManager.FindByEmailAsync(email.Trim());
            if (user == null)
            {
                user = await userManager.FindByNameAsync(email.Trim());
                if (user == null)
                    return (null, "Incorrect Email/Password");
            }

            // check password
            if (!await userManager.CheckPasswordAsync(user, password))
            {
                return (null,"Incorrect Email/Password!");
            }

            var role = (List<string>)await userManager.GetRolesAsync(user);

            var payload = mapper.Map<AuthPayload>(user);
            if (role.Count > 0)
                payload.Role = role[0];

            return (payload, "success");
        }






        #region Private methods
        private string[] ParseModelError(IdentityResult result)
        {
            return (from error in result.Errors select error.Description).ToArray();
        }
        #endregion
    }
}
