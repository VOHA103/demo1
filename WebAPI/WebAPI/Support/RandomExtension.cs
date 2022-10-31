using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Support
{
    public static class RandomExtension
    {
        public static string NextString(this Random random)
        {
            const string chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
            return new string(Enumerable.Repeat(chars, 10)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public static string getStringID()
        {
            Random random = new Random();
            string s1 = random.NextString();
            string s2 = random.NextString();
            string s3 = random.NextString();
            string s4 = random.NextString();
            string s5 = random.NextString();
            string s = s1 + "-" + s2 + "-" + s3 + "-" + s4 + "-" + s5;
            return s;
        }
    }
}
