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
            list_bo_mon = new List<string>();
        }
        public sys_giang_vien db { get; set; }
        public string create_name { get; set; }
        public string update_name { get; set; }
        public string ten_chuc_vu { get; set; }
        public string ten_khoa { get; set; }
        public string ten_chuyen_nghanh { get; set; }
        public string ten_bo_mon { get; set; }
        public List<string> list_bo_mon { get; set; }
    }
    public class excel_import
    {
        public string ten { get; set; }
        public string nam_sinh { get; set; }
    }
    public class filter_data_giang_vien
    {
        public string search { get; set; }
        public string status_del { get; set; }
        public int? id_chuc_vu { get; set; }
        public int? id_khoa { get; set; }
        public string id_bo_mon { get; set; }
        public int? id_chuyen_nghanh { get; set; }

    }
}
