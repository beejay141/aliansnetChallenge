﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Core.Entities
{
    public class AppRole: IdentityRole
    {
        public string DisplayName { get; set; }
    }
}
