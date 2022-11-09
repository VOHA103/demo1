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
        public string ten_bo_mon { get; set; }
        public List<string> list_bo_mon { get; set; }
    }
    public class filter_data_giang_vien
    {
        public string search { get; set; }
        public string total { get; set; }
        public string page { get; set; }
        public string limit { get; set; }
        public string status_del { get; set; }
        public string id_chuc_vu { get; set; }
        public string id_khoa { get; set; }
        public string id_bo_mon { get; set; }
        public string id_chuyen_nghanh { get; set; }

    }
}
