using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class sys_giang_vien_truc_khoa_model
    {
        public sys_giang_vien_truc_khoa_model()
        {
            db = new sys_giang_vien_truc_khoa();
        }
        public sys_giang_vien_truc_khoa db { get; set; }
        public string create_name { get; set; }
        public string update_name { get; set; }
    }
}
