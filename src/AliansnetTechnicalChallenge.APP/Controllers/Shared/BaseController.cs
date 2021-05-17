using AliansnetTechnicalChallenge.APP.Helpers.CustomAttributes;
using AliansnetTechnicalChallenge.Core.Models.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.APP.Controllers.Shared
{
    [Route("api/[controller]")]
    [TypeFilter(typeof(ModelValidator)), TypeFilter(typeof(ExceptionFilter))]
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected ApiRes ApiRes(string msg, object data = null, string[] err = null)
        {
            return new ApiRes(msg, data, err);
        }
    }
}
