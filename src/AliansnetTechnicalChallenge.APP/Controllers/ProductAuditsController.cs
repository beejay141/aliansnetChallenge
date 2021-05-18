using AliansnetTechnicalChallenge.APP.Controllers.Shared;
using AliansnetTechnicalChallenge.Core.Interfaces;
using AliansnetTechnicalChallenge.Core.Interfaces.Helpers;
using AliansnetTechnicalChallenge.Core.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.APP.Controllers
{
   
    public class ProductAuditsController : BaseController
    {
        private readonly IAccountService accountService;
        private readonly IProductAuditService productAuditService;
        private readonly IApplogger logger;

        public ProductAuditsController(IAccountService accountService, IProductAuditService productAuditService, IApplogger logger)
        {
            this.accountService = accountService;
            this.productAuditService = productAuditService;
            this.logger = logger;
        }


        [Authorize]
        [HttpGet("product/{id}")]
        public async Task<IActionResult> GetProductAudits(string id)
        {
            try
            {

                var audits = await productAuditService.GetProductAuditsAsync(id);

                return Ok(ApiRes("success", audits));

            }
            catch (Exception ex)
            {
                _ = logger.ErrorAsync($"An Error occurred fetching product audit, {ex}");
                return StatusCode(500, ApiRes("Unexpected Error has occurred, Do contact our support team. Thanks"));
            }
        }

    }
}
