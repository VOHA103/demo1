﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class sys_chuc_vu_model
    {
        public sys_chuc_vu_model()
        {
            db = new sys_chuc_vu();
        }
        public sys_chuc_vu db { get; set; }
        public string create_name { get; set; }
        public string update_name { get; set; }
    }
}
