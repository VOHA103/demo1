using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.System
{
    public class sys_giang_vien_truc_khoa
    {
        public int id { get; set; }
        public string id_giang_vien { get; set; }
        public int id_phong_truc { get; set; }
        public int id_ky_truc { get; set; }



        public string create_by { get; set; }
        public DateTime? create_date { get; set; }
        public string update_by { get; set; }

        public DateTime? update_date { get; set; }
        public int? status_del { get; set; }
        public int? trang_thai { get; set; }
        
        public string note { get; set; }
    }
}
