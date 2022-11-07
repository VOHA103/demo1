using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.System
{
    public class sys_giang_vien
    {
        public string id { get; set; }
        public int id_chuc_vu { get; set; }
        public int id_khoa { get; set; }
        public int gioi_tinh { get; set; }
        public string id_bo_mon { get; set; }
        public string id_chuyen_nghanh { get; set; }
        public string ten_giang_vien { get; set; }
        public string ma_giang_vien { get; set; }
        public string sdt { get; set; }
        public string email { get; set; }
        public string dia_chi { get; set; }
        //1 nam 2 nữ 3 khác
        public DateTime? ngay_sinh { get; set; }
        public string username { get; set; }
        public string pass_word { get; set; }
        public string create_by { get; set; }
        public DateTime? create_date { get; set; }
        public string update_by { get; set; }
        public DateTime? update_date { get; set; }
        //1 đang sử dụng 2 ngưng sử dụng
        public int? status_del { get; set; }
        public string note { get; set; }
    }
}
