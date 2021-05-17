using AliansnetTechnicalChallenge.Core.Enums;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Core.Entities
{
    public class Product
    {
        [Key]
        public string Id { get; set; }
        public decimal Price { get; set; }
        public string Name { get; set; }
        public RecordStatus RecordStatus { get; set; }
        public string UserId { get; set; }
        public virtual AppUser User { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public Product()
        {
            RecordStatus = RecordStatus.Active;
        }
    }
}
