using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class sys_chuyen_nganh_model
    {
        public sys_chuyen_nganh_model()
        {
            db = new sys_chuyen_nganh();
        }
        public sys_chuyen_nganh db { get; set; }
        public string create_name { get; set; }
        public string update_name { get; set; }
    }
    public class filter_data_chuyen_nghanh
    {
        public string search { get; set; }
        public string total { get; set; }
        public string page { get; set; }
        public string limit { get; set; }
        public string status_del { get; set; }

    }
}
