using AliansnetTechnicalChallenge.Core.Entities;
using AliansnetTechnicalChallenge.Core.Models.Requests;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Core.Mapping
{
    public class MapClientRequestToDomain: Profile
    {
        public MapClientRequestToDomain()
        {
            CreateMap<RegisterRequestModel, AppUser>();

            CreateMap<AddProductRequestModel, Product>();
        }
    }
}
