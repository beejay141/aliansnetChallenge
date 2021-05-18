using AliansnetTechnicalChallenge.APP.Controllers.Shared;
using AliansnetTechnicalChallenge.Core.Entities;
using AliansnetTechnicalChallenge.Core.Enums;
using AliansnetTechnicalChallenge.Core.Interfaces;
using AliansnetTechnicalChallenge.Core.Interfaces.Helpers;
using AliansnetTechnicalChallenge.Core.Interfaces.Services;
using AliansnetTechnicalChallenge.Core.Models.Requests;
using AliansnetTechnicalChallenge.Core.Models.Response.Product;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.APP.Controllers
{
    public class ProductsController : BaseController
    {
        private readonly IAccountService accountService;
        private readonly IProductService productService;
        private readonly IProductAuditService productAuditService;
        private readonly IApplogger logger;
        private readonly IMapper mapper;

        public ProductsController(IAccountService accountService, IProductService productService, IProductAuditService productAuditService, IApplogger logger, IMapper mapper)
        {
            this.accountService = accountService;
            this.productService = productService;
            this.productAuditService = productAuditService;
            this.logger = logger;
            this.mapper = mapper;
        }

        [Authorize(Roles = "Worker"), HttpGet("")]
        public async Task<IActionResult> GetProducts([FromQuery] string name = "", [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var user = await accountService.GetUserWithContextUser(User);

                List<Product> products = null;

                if (string.IsNullOrEmpty(name))
                {
                    products = await productService.GetUserProducts(c => c.UserId == user.Id && c.RecordStatus == RecordStatus.Active, (page - 1) * pageSize, pageSize);
                }
                else
                {
                    products = await productService.GetUserProducts(c => c.UserId == user.Id && c.RecordStatus == RecordStatus.Active && c.Name.ToLower().StartsWith(name.ToLower()), (page - 1) * pageSize, pageSize);
                }

                return Ok(ApiRes("success", mapper.Map<List<ProductViewModel>>(products)));

            }
            catch (Exception ex)
            {
                _ = logger.ErrorAsync($"An Error occurred while fetching user's products, {ex}");
                return StatusCode(500, ApiRes("Unexpected Error has occurred, Do contact our support team. Thanks"));
            }
        }

        [Authorize(Roles = "Admin"), HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserProducts([FromRoute] string userId, [FromQuery] string name = "", [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            try
            {

                List<Product> products = null;

                if (string.IsNullOrEmpty(name))
                {
                    products = await productService.GetUserProducts(c => c.UserId == userId, (page - 1) * pageSize, pageSize);
                }
                else
                {
                    products = await productService.GetUserProducts(c => c.UserId == userId && c.Name.ToLower().StartsWith(name.ToLower()), (page - 1) * pageSize, pageSize);
                }

                return Ok(ApiRes("success", mapper.Map<List<ProductViewModel>>(products)));

            }
            catch (Exception ex)
            {
                _ = logger.ErrorAsync($"An Error occurred while fetching user's products, {ex}");
                return StatusCode(500, ApiRes("Unexpected Error has occurred, Do contact our support team. Thanks"));
            }
        }

        [Authorize(Roles = "Worker")]
        [HttpPost("create-new-product")]
        public async Task<IActionResult> CreateNewProduct([FromBody] AddProductRequestModel model)
        {
            try
            {
                var user = await accountService.GetUserWithContextUser(User);

                var products = await productService.GetUserProducts(c => c.UserId == user.Id && c.Name == model.Name && c.RecordStatus == RecordStatus.Active, 0, 1, false);
                if (products.Count > 0)
                {
                    return BadRequest(ApiRes("You already have a product with the same name"));
                }

                var product = mapper.Map<Product>(model);
                product.UserId = user.Id;
                product = await productService.AddNewProduct(product);

                return Ok(ApiRes("Product added successfully", mapper.Map<ProductViewModel>(product)));

            }
            catch (Exception ex)
            {
                _ = logger.ErrorAsync($"An Error occurred while creating new user, {ex}");
                return StatusCode(500, ApiRes("Unexpected Error has occurred, Do contact our support team. Thanks"));
            }
        }

        [Authorize(Roles = "Worker", AuthenticationSchemes = "Bearer")]
        [HttpPut("update-product/{id}")]
        public async Task<IActionResult> UpdateProduct(string id, [FromBody] AddProductRequestModel model)
        {
            try
            {
                var user = await accountService.GetUserWithContextUser(User);

                var product = await productService.GetProductById(id);

                if (product == null) return BadRequest(ApiRes("Product with the supplied ID not found"));
                if (product.UserId != user.Id) return BadRequest(ApiRes("Product with the supplied ID not found"));

                var products = await productService.GetUserProducts(c => c.UserId == user.Id && c.Name == model.Name && c.Id != id && c.RecordStatus == RecordStatus.Active, 0, 1, false);
                if (products.Count > 0) return BadRequest(ApiRes("You already have a product with the same name"));

                var auditMsg = $"you updated the product. Price {product.Price} => {model.Price} and Name: {product.Name} => {model.Name}";

                product = mapper.Map(model, product);

                await productService.UpdateProduct(product, auditMsg);

                return Ok(ApiRes("Product removed successfully", mapper.Map<ProductViewModel>(product)));

            }
            catch (Exception ex)
            {
                _ = logger.ErrorAsync($"An Error occurred while updating product, {ex}");
                return StatusCode(500, ApiRes("Unexpected Error has occurred, Do contact our support team. Thanks"));
            }
        }


        [Authorize(Roles = "Worker"), HttpDelete("remove-product/{id}")]
        public async Task<IActionResult> RemoveProduct(string id)
        {
            try
            {
                var user = await accountService.GetUserWithContextUser(User);

                var product = await productService.GetProductById(id);

                if (product == null) return BadRequest(ApiRes("Product with the supplied ID not found"));

                if (product.UserId != user.Id) return BadRequest(ApiRes("Product with the supplied ID not found"));

                await productService.SoftDeleteProduct(product);

                return Ok(ApiRes("Product removed successfully", mapper.Map<ProductViewModel>(product)));

            }
            catch (Exception ex)
            {
                _ = logger.ErrorAsync($"An Error occurred while deleting product, {ex}");
                return StatusCode(500, ApiRes("Unexpected Error has occurred, Do contact our support team. Thanks"));
            }
        }
    }
}
