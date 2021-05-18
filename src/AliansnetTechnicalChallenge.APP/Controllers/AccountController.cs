using AliansnetTechnicalChallenge.APP.Controllers.Shared;
using AliansnetTechnicalChallenge.Core.Entities;
using AliansnetTechnicalChallenge.Core.Interfaces;
using AliansnetTechnicalChallenge.Core.Interfaces.Helpers;
using AliansnetTechnicalChallenge.Core.Models.Requests;
using AliansnetTechnicalChallenge.Core.Models.Response.Account;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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

        [Authorize(Roles ="Admin")]
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers([FromQuery] string username = "", [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                List<AppUser> users = null;

                if (!string.IsNullOrEmpty(username))
                {
                    users = await accountService.GetUsers(c => c.UserName.ToLower().Contains(username.ToLower()), (page - 1) * pageSize, pageSize);
                }
                else
                {
                    users = await accountService.GetUsers(null,(page - 1) * pageSize, pageSize);
                }

                return Ok(ApiRes("success", mapper.Map<List<UserVm>>(users)));

            }
            catch (Exception ex)
            {
                _ = logger.ErrorAsync($"An Error occurred while fetching users {ex}");
                return StatusCode(500, ApiRes("Unexpected Error has occurred, Do contact our support team. Thanks"));
            }
        }

    }
}
