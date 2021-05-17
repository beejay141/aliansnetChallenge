using AliansnetTechnicalChallenge.Core.Models.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.APP.Helpers.CustomAttributes
{
    public class ModelValidator : ActionFilterAttribute
    {
        public override Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (!context.ModelState.IsValid)
            {
                string[] list = (from modelState in context.ModelState.Values from error in modelState.Errors select error.ErrorMessage).ToArray();
                context.Result = new BadRequestObjectResult(new ApiRes("error", null, list));
            }

            return base.OnActionExecutionAsync(context, next);
        }
    }
}
