using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AliansnetTechnicalChallenge.Core.Models.Response
{
    public class ApiRes
    {
        public string message { get; set; }
        public object data { get; set; }
        public string[] errors { get; set; }

        public ApiRes(string msg, object dat = null, string[] err = null)
        {
            this.message = msg;
            this.data = dat;
            this.errors = err;
        }
    }
}
