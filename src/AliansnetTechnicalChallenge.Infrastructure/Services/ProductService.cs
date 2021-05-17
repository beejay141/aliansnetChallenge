using AliansnetTechnicalChallenge.Core.Entities;
using AliansnetTechnicalChallenge.Core.Interfaces.Repositories;
using AliansnetTechnicalChallenge.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Infrastructure.Services
{
    public class ProductService : IProductService
    {
        private readonly IRepository<Product, string> repository;
        private readonly IProductAuditService productAuditService;

        public ProductService(IRepository<Product, string> repository, IProductAuditService productAuditService)
        {
            this.productAuditService = productAuditService;
            this.repository = repository;
        }

        public async Task<Product> AddNewProduct(Product data)
        {
            await repository.InsertAsync(data);
            await productAuditService.LogNewActivityAsync(new ProductAudit() { ProductId = data.Id, Description = $"Product created" });
            await repository.CommitUnitOfWorkAsync();
            return data;
        }

        public async Task<Product> GetProductById(string Id)
        {
            return await repository.FindAsync(Id);
        }

        public async Task<List<Product>> GetUserProducts(Func<Product,bool> filter, int skip = 0, int? take = null, bool sortIt= true)
        {
            return sortIt ? await repository.FindAllAsync(filter, skip, take, c => c.CreatedAt) : await repository.FindAllAsync(filter, skip, take);
        }

        public async Task SoftDeleteProduct(Product data)
        {
            data.RecordStatus = Core.Enums.RecordStatus.Deleted;
            data.UpdatedAt = DateTime.UtcNow;

            repository.Update(data);
            await productAuditService.LogNewActivityAsync(new ProductAudit() { ProductId = data.Id, Description = $"Product deleted" });

            await repository.CommitUnitOfWorkAsync();
        }

        public async Task UpdateProduct(Product data, string auditMessage)
        {
            data.UpdatedAt = DateTime.UtcNow;

            repository.Update(data);

            await productAuditService.LogNewActivityAsync(new ProductAudit() { ProductId = data.Id, Description = auditMessage});

            await repository.CommitUnitOfWorkAsync();
        }
    }
}
