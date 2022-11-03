using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class sys_giang_vien_model
    {
        public sys_giang_vien_model()
        {
            db = new sys_giang_vien();
        }
        public sys_giang_vien db { get; set; }
        public string create_name { get; set; }
        public string update_name { get; set; }
        public string ten_chuc_vu { get; set; }
        public string ten_khoa { get; set; }
    }
}
