using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class sys_thong_bao_model
    {
        public sys_thong_bao_model()
        {
            db = new sys_thong_bao();
        }
        public sys_thong_bao db { get; set; }
        public string create_name { get; set; }
        public string update_name { get; set; }
    }
}
