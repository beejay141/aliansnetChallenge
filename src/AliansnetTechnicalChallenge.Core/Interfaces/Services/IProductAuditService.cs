using AliansnetTechnicalChallenge.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Core.Interfaces.Services
{
    public interface IProductAuditService
    {
        Task<ProductAudit> LogNewActivityAsync(ProductAudit audit);
        Task<List<ProductAudit>> GetProductAuditsAsync(string productId);
    }
}
