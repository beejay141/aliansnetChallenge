using AliansnetTechnicalChallenge.Core.Entities;
using AliansnetTechnicalChallenge.Core.Models.Requests;
using AliansnetTechnicalChallenge.Core.Models.Requests.Auth;
using AliansnetTechnicalChallenge.Core.Models.Response.Account;
using AliansnetTechnicalChallenge.Core.Models.Response.Product;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Core.Mapping
{
    class MapDomainModelToClient : Profile
    {
        public MapDomainModelToClient()
        {
            CreateMap<AppUser, RegisterRequestModel>();
            CreateMap<AppUser, AuthPayload>();
            CreateMap<AppUser, UserVm>();
            CreateMap<Product, ProductViewModel>()
                .ForMember(c => c.RecordStatus, opt => opt.MapFrom(c => c.RecordStatus.ToString()));
        }
    }
}
