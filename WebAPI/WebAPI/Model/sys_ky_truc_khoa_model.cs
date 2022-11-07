using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class sys_ky_truc_khoa_model
    {
        public sys_ky_truc_khoa_model()
        {
            db = new sys_ky_truc_khoa();
        }
        public sys_ky_truc_khoa db { get; set; }
        public string create_name { get; set; }
        public string update_name { get; set; }
    }
    public class filter_data_ky_truc_khoa
    {
        public string search { get; set; }
        public string total { get; set; }
        public string page { get; set; }
        public string limit { get; set; }
        public string status_del { get; set; }

    }
}
