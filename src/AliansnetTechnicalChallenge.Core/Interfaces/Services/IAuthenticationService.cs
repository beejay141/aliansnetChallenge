using AliansnetTechnicalChallenge.Core.Models.Requests.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Core.Interfaces
{
    public interface IAuthenticationService
    {
        AuthPayload GenerateAuthToken(AuthPayload payload, string email);
    }
}
