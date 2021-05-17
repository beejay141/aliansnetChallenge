using AliansnetTechnicalChallenge.Core.Interfaces;
using AliansnetTechnicalChallenge.Core.Interfaces.Helpers;
using AliansnetTechnicalChallenge.Core.Models.Requests.Auth;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Infrastructure.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly ISettings settings;

        public AuthenticationService(ISettings settings)
        {
            this.settings = settings;
        }


        public AuthPayload GenerateAuthToken(AuthPayload payload, string email)
        {
            var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, settings.GetString("Jwt:subject")),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("id", payload.Id),
                    new Claim("FirstName", payload.FirstName),
                    new Claim("LastName", payload.LastName),
                    new Claim(ClaimTypes.Name, email),
                    new Claim(ClaimTypes.NameIdentifier, payload.Id),
                    new Claim(ClaimTypes.Role, payload.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settings.GetString("Jwt:key")));

            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var days = settings.GetInt("Jwt:exp",1);

            var exp = DateTime.UtcNow.AddDays(days);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, email),
                    new Claim(ClaimTypes.NameIdentifier, payload.Id), new Claim(ClaimTypes.Role, payload.Role) }),
                Expires = exp,
                SigningCredentials = signIn,
                Audience = settings.GetString("Jwt:audience"),
                Issuer = settings.GetString("Jwt:issuer")
            };

            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateToken(tokenDescriptor);
            payload.Token = handler.WriteToken(token);
            payload.Expiry = (Int32)(exp.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;


            return payload;
        }
    }
}
