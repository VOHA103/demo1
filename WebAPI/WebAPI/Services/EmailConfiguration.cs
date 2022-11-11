using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Services
{
    public class EmailConfiguration
    {
        public const string SectionName = "EmailConfiguration";
        public string From { get; set; }
        public string SmtpServer { get; set; }
        public int? Port { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool emailIsSSL { get; set; }
    }
}
