using AliansnetTechnicalChallenge.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Core.Interfaces.Services
{
    public interface IProductService
    {
        Task<Product> AddNewProduct(Product data);
        Task<Product> GetProductById(string Id);
        Task UpdateProduct(Product data, string auditMessage);
        Task SoftDeleteProduct(Product data);
        Task<List<Product>> GetUserProducts(Func<Product, bool> filter, int skip = 0, int? take = null, bool sortIt = true);
    }
}
