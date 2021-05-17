using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Core.Interfaces.Helpers
{
    public interface IApplogger
    {
        void Info(string message, object data = null);
        void Error(string message, object data = null, Exception ex = null);
        Task InfoAsync(string message, object data = null);
        Task ErrorAsync(string message, object data = null, Exception ex = null);
    }
}
