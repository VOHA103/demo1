using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class sys_phong_truc_model
    {
        public sys_phong_truc_model()
        {
            db = new sys_phong_truc();
        }
        public sys_phong_truc db { get; set; }
        public string create_name { get; set; }
        public string update_name { get; set; }
    }
}
