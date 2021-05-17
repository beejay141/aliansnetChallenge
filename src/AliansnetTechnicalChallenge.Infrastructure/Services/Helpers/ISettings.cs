using AliansnetTechnicalChallenge.Core.Interfaces.Helpers;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Infrastructure.Services.Helpers
{
    public class SettingsService : ISettings
    {
        private readonly IConfiguration configuration;

        public SettingsService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string GetString(string key, string defaultValue = "")
        {
            var value = configuration[key];
            try
            {
                if (!string.IsNullOrEmpty(value)) return value;
                return defaultValue;
            }
            catch
            {
                return defaultValue;
            }
        }

        public int GetInt(string key, int defaultValue = 0)
        {
            var value = configuration[key];
            try
            {
                if (!string.IsNullOrEmpty(value)) return Convert.ToInt32(value);
                return defaultValue;
            }
            catch
            {
                return defaultValue;
            }
        }

    }
}
