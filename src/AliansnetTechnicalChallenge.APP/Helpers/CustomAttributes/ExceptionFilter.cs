using AliansnetTechnicalChallenge.Core.Interfaces.Helpers;
using AliansnetTechnicalChallenge.Core.Models.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.APP.Helpers.CustomAttributes
{
    public class ExceptionFilter : IExceptionFilter
    {
        private readonly IApplogger logger;

        public ExceptionFilter(IApplogger logger)
        {
            this.logger = logger;
        }
        public void OnException(ExceptionContext context)
        {
            logger.Error(string.Format("internal server error occured, reason: {0}, at {1}", context.Exception.Message, DateTime.UtcNow));
            logger.Error(context.Exception.ToString());
            context.Result = new ObjectResult(new ApiRes("error", null, new string[] { "An error has occured!" })) { StatusCode = 500 };
        }
    }

}
