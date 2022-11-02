using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Part
{
    public class set_error
    {
        public static check_error set(string key, string value)
        {
            check_error error = new check_error();
            error.key = key;
            error.value = value;
            return error;
        }
    }
}
