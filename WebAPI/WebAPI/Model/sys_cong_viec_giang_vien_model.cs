using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class sys_cong_viec_giang_vien_model
    {
        public sys_cong_viec_giang_vien_model()
        {
            db = new sys_cong_viec_giang_vien();
        }
        public sys_cong_viec_giang_vien db { get; set; }
        public string create_name { get; set; }
        public string update_name { get; set; }
        public string ten_giang_vien { get; set; }
        public string ten_cong_viec { get; set; }
        public string ten_loai_cong_viec { get; set; }
        public List<string> list_giang_vien { get; set; }
    }
}
