﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Core.Entities
{
    public class ProductAudit
    {
        [Key]
        public int Id { get; set; }
        public string ProductId { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
