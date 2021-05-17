using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Core.Interfaces.Helpers
{
    public interface ISettings
    {
        string GetString(string key, string defaultValue = "");
        int GetInt(string key, int defaultValue = 0);
    }
}
