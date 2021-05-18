using AliansnetTechnicalChallenge.APP.Helpers.CustomAttributes;
using AliansnetTechnicalChallenge.Core.Entities;
using AliansnetTechnicalChallenge.Core.Interfaces;
using AliansnetTechnicalChallenge.Core.Interfaces.Helpers;
using AliansnetTechnicalChallenge.Core.Interfaces.Repositories;
using AliansnetTechnicalChallenge.Core.Interfaces.Services;
using AliansnetTechnicalChallenge.Core.Mapping;
using AliansnetTechnicalChallenge.Core.Models.Requests;
using AliansnetTechnicalChallenge.Core.Models.Requests.Auth;
using AliansnetTechnicalChallenge.Infrastructure.Data.DbContext;
using AliansnetTechnicalChallenge.Infrastructure.Services;
using AliansnetTechnicalChallenge.Infrastructure.Services.Helpers;
using AliansnetTechnicalChallenge.Infrastructure.Services.Repositories;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.APP.Helpers.Extensions
{
    public static class StartupConfigExtension
    {

        public static IServiceCollection ConfigureCoreService(this IServiceCollection services, IConfiguration configuration)
        {

            #region register fluent validations
            services.AddTransient<IValidator<RegisterRequestModel>, RegisterRequestModelValidator>();
            services.AddTransient<IValidator<LoginRequestModel>, LoginRequestModelValidator>();
            services.AddTransient<IValidator<AddProductRequestModel>, AddProductRequestModelValidator>();
            #endregion


            #region config identity and db connections
            services.AddDbContextPool<MssqlDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddIdentity<AppUser, AppRole>(option =>
            {
                option.Password.RequireDigit = false;
                option.Password.RequireLowercase = false;
                option.Password.RequireUppercase = false;
                option.Password.RequireNonAlphanumeric = false;
                option.Password.RequiredLength = 6;
                option.User.RequireUniqueEmail = true; 
            }).AddEntityFrameworkStores<MssqlDbContext>()
             .AddDefaultTokenProviders();
            #endregion

            //services.ConfigureApplicationCookie(options =>
            //{

            //    options.Events.OnRedirectToReturnUrl = context =>
            //    {
            //        context.Response.StatusCode = 401;
            //        return Task.CompletedTask;
            //    };
            //});

            //services.ConfigureApplicationCookie(options =>
            //{
            //    options.Events.OnRedirectToAccessDenied = context =>
            //    {
            //        context.Response.StatusCode = 401;
            //        return Task.CompletedTask;
            //    };
            //});


            #region config authentication 
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(jwtOption =>
            {
                jwtOption.RequireHttpsMetadata = false;
                jwtOption.SaveToken = true;
                jwtOption.Events = new JwtBearerEvents();
                jwtOption.Events.OnAuthenticationFailed = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                }; jwtOption.Events.OnForbidden = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };

                jwtOption.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateLifetime = true,
                    ValidateAudience = true,
                    ValidAudience = configuration["Jwt:audience"],
                    ValidIssuer = configuration["Jwt:issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:key"]))
                };
            });
            #endregion


            return services;
        }

        public static IServiceCollection ConfigureInfrastructureServices(this IServiceCollection services)
        {
            #region Singleton Services
            services.AddSingleton<IApplogger, AppLogger>();
            services.AddSingleton<ISettings, SettingsService>();
            services.AddSingleton<IAuthenticationService, AuthenticationService>();
            #endregion

            #region Scoped Services
            services.AddScoped<ModelValidator>();
            services.AddScoped<ExceptionFilter>();
            services.AddScoped(typeof(IRepository<,>), typeof(MssqlBaseRepository<,>));
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IProductAuditService, ProductAuditService>();
            #endregion


            services.AddAutoMapper(typeof(MapClientRequestToDomain));


            return services;
        }
    }
}
