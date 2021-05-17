using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.APP.Controllers.Shared
{
    public class ErrorsController : BaseController
    {

        [Route("/errors/{code}")]
        [HttpGet]
        public IActionResult Error(int code)
        {
            HttpStatusCode parsedCode = (HttpStatusCode)code;
            if (parsedCode == HttpStatusCode.NotFound)
            {
                return NotFound(ApiRes("Not Found", null, new string[] { "Not Found" }));
            }
            else if (parsedCode == HttpStatusCode.Unauthorized)
            {
                return Unauthorized(ApiRes("None or invalid auth token", null, new string[] { "None or invalid auth token" }));
            }
            else if (parsedCode == HttpStatusCode.Forbidden)
            {
                return new ObjectResult(ApiRes("Not enough permission", null, new string[] { "Not enough permission" })) { StatusCode = 403 };
            }
            else if (parsedCode == HttpStatusCode.MethodNotAllowed)
            {
                return new ObjectResult(ApiRes("Method Not Allowed", null, new string[] { "Method Not Allowed" })) { StatusCode = 405 };
            }

            return new ObjectResult(ApiRes("An error has occured!", null, new string[] { "An error has occured!" })) { StatusCode = 500 };
        }

    }

}
