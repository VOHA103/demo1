using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.System
{
    public class sys_cap_nhat_tt_giang_vien
    {
        public int id { get; set; }
        public string id_giang_vien { get; set; }
        public string ten_giang_vien { get; set; }
        public string sdt { get; set; }
        public string email { get; set; }
        public string dia_chi { get; set; }
        public DateTime? ngay_sinh { get; set; }
        public string create_by { get; set; }
        public DateTime? create_date { get; set; }
        public string update_by { get; set; }
        public DateTime? update_date { get; set; }
        public int? status_del { get; set; }
        public int? trang_thai { get; set; }
        public string note { get; set; }
    }
}
