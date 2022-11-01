using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class sys_hoat_dong_model
    {
        public sys_hoat_dong_model()
        {
            db = new sys_hoat_dong();
        }
        public sys_hoat_dong db { get; set; }
        public string create_name { get; set; }
        public string update_name { get; set; }
    }
}
