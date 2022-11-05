using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.System
{
    public class sys_cong_viec_giang_vien
    {
        public string  id { get; set; }
        public string id_giang_vien { get; set; }
        public string id_cong_viec { get; set; }
        public int? so_gio { get; set; }
        public string create_by { get; set; }
        public DateTime? create_date { get; set; }
        public string update_by { get; set; }
        public DateTime? update_date { get; set; }
        public int? status_del { get; set; }
        public string note { get; set; }
    }
}
