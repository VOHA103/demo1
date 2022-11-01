using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class sys_cong_viec_model
    {
        public sys_cong_viec_model()
        {
            db = new sys_cong_viec();
        }
        public sys_cong_viec db { get; set; }
        public string create_name { get; set; }
        public string update_name { get; set; }
    }
}
