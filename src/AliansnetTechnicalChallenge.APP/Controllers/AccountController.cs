using AliansnetTechnicalChallenge.APP.Controllers.Shared;
using AliansnetTechnicalChallenge.Core.Entities;
using AliansnetTechnicalChallenge.Core.Interfaces;
using AliansnetTechnicalChallenge.Core.Interfaces.Helpers;
using AliansnetTechnicalChallenge.Core.Models.Requests;
using AliansnetTechnicalChallenge.Core.Models.Response.Account;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.APP.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IAccountService accountService;
        private readonly IApplogger logger;
        private readonly IMapper mapper;

        public AccountController(IAccountService accountService, IApplogger logger, IMapper mapper)
        {
            this.accountService = accountService;
            this.logger = logger;
            this.mapper = mapper;
        }

        [HttpPost("create-user")]
        public async Task<IActionResult> CreateNewUser([FromBody] RegisterRequestModel model)
        {
            try
            {
                var user = mapper.Map<AppUser>(model);

                var result = await accountService.CreateUser(user, model.Password);

                if (result.user == null)
                {
                    return BadRequest(ApiRes("error", null, result.errors));
                }

                return Ok(ApiRes("User created successfully",mapper.Map<UserVm>(result.user)));
            }
            catch (Exception ex)
            {
                _ = logger.ErrorAsync($"An Error occurred while creating new user, {ex}");
                return StatusCode(500, ApiRes("Unexpected Error has occurred, Do contact our support team. Thanks"));
            }
        }
    }
}
