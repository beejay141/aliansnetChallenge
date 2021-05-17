using AliansnetTechnicalChallenge.Core.Entities;
using AliansnetTechnicalChallenge.Core.Models.Response.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Core.Models.Response.Product
{
    public class ProductViewModel
    {
        public string Id { get; set; }
        public decimal Price { get; set; }
        public string Name { get; set; }
        public string RecordStatus { get; set; }
        public string UserId { get; set; }
        public UserVm User { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<ProductAudit> Audits { get; set; }


        public ProductViewModel()
        {
            Audits = new List<ProductAudit>();
        }
    }
}
