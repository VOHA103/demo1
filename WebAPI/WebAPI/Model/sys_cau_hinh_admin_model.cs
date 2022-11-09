using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class sys_cau_hinh_admin_model
    {
        public sys_cau_hinh_admin_model()
        {
            db = new sys_cau_hinh_admin();
        }
        public sys_cau_hinh_admin db { get; set; }
        public string create_name { get; set; }
        public string update_name { get; set; }
    }
}
