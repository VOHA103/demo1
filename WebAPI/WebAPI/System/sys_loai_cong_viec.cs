using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.System
{
    public class sys_loai_cong_viec
    {
        public int id { get; set; }
        public string ten_loai_cong_viec { get; set; }
        public string create_by { get; set; }
        public DateTime? create_date { get; set; }
        public string update_by { get; set; }
        public DateTime? update_date { get; set; }
        public int? status_del { get; set; }
        public int? so_gio { get; set; }
        public int? id_khoa { get; set; }
        //loại == 1 => loại công việc dành cho cá nhân
        //loại == 2 => loại công việc dành cho team nhóm
        // nếu loại bằng 2 
        public int? loai { get; set; }
        public string note { get; set; }
    }
}
