using AliansnetTechnicalChallenge.Core.Entities;
using AliansnetTechnicalChallenge.Core.Models.Requests;
using AliansnetTechnicalChallenge.Core.Models.Requests.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Core.Interfaces
{
    public interface IAccountService
    {
        Task<(AppUser user, string[] errors)> CreateUser(AppUser newUser, string password);
        Task<(AuthPayload user, string error)> ValidateUserCredentials(string email, string password);
        Task<AppUser> GetUserWithContextUser(ClaimsPrincipal User);

        Task<List<AppUser>> GetUsers(Func<AppUser, bool> filter, int skip = 0, int? take = null, bool sortIt = true);
        
    }
}
