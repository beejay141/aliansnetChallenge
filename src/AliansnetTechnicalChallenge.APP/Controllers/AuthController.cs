using AliansnetTechnicalChallenge.APP.Controllers.Shared;
using AliansnetTechnicalChallenge.Core.Interfaces;
using AliansnetTechnicalChallenge.Core.Interfaces.Helpers;
using AliansnetTechnicalChallenge.Core.Models.Requests.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.APP.Controllers
{
    public class AuthController : BaseController
    {
        private readonly IAccountService accountService;
        private readonly IAuthenticationService authenticationService;
        private readonly IApplogger logger;

        public AuthController(IAccountService accountService, IAuthenticationService authenticationService, IApplogger logger)
        {
            this.accountService = accountService;
            this.authenticationService = authenticationService;
            this.logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestModel model)
        {
            try
            {
                var (user, error) = await accountService.ValidateUserCredentials(model.Email, model.Password);

                if (user == null)
                {
                    return BadRequest(ApiRes(error));
                }

                var payload = authenticationService.GenerateAuthToken(user, model.Email);

                return Ok(ApiRes("You're logged in", payload));
            }
            catch (Exception ex)
            {
                _ = logger.ErrorAsync($"An Error occurred while authenticating new user, {ex}");

                return StatusCode(500, ApiRes("Unexpected Error has occurred, Do contact our support team. Thanks"));
            }
        }
    }
}
