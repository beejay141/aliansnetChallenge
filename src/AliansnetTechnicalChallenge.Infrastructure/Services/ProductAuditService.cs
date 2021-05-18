using AliansnetTechnicalChallenge.Core.Entities;
using AliansnetTechnicalChallenge.Core.Interfaces.Helpers;
using AliansnetTechnicalChallenge.Core.Interfaces.Repositories;
using AliansnetTechnicalChallenge.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Infrastructure.Services
{
    public class ProductAuditService : IProductAuditService
    {
        private readonly IRepository<ProductAudit, int> repository;
        private readonly IApplogger logger;

        public ProductAuditService(IRepository<ProductAudit,int> repository, IApplogger logger)
        {
            this.repository = repository;
            this.logger = logger;
        }

        public  async Task<List<ProductAudit>> GetProductAuditsAsync(string productId)
        {
            try
            {
                return await repository.FindAllAsync(c => c.ProductId == productId, orderBy: c=>c.CreatedAt);
            }
            catch (Exception ex)
            {
                _ = logger.ErrorAsync($"Error getting product;s audits: {ex}");

                return new List<ProductAudit>();
            }
        }

        public async Task<ProductAudit> LogNewActivityAsync(ProductAudit audit)
        {
            try
            {
                await repository.InsertAsync(audit);
                return audit;
            }
            catch (Exception ex)
            {
                _ = logger.ErrorAsync($"Error creating product's audit log {ex}");

                throw;
            }
        }
    }
}
