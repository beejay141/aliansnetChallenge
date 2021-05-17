using AliansnetTechnicalChallenge.Core.Interfaces.Helpers;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Infrastructure.Services.Helpers
{
    public class AppLogger : IApplogger
    {
        readonly ILogger<AppLogger> _logger;
        public AppLogger(ILogger<AppLogger> logger)
        {
            _logger = logger;
        }

        public void Error(string message, object data = null, Exception ex = null)
        {
            if (ex != null)
                _logger.LogError(ex, message, data);
            else
                _logger.LogError(message, data);
        }

        public async Task ErrorAsync(string message, object data = null, Exception ex = null)
        {
            await Task.Run(() => Error(message, data, ex));
        }

        public void Info(string message, object data = null)
        {
            try
            {
                _logger.LogInformation(message, data);
            }
            catch
            {
                if (message.Length > 2)
                {
                    var center = message.Length / 2;
                    _logger.LogInformation(message.Substring(0, center));
                    _logger.LogInformation(message.Substring(center));
                }
            }

        }

        public async Task InfoAsync(string message, object data = null)
        {
            await Task.Run(() => Info(message, data));
        }

    }
}
