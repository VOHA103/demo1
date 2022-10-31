﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class user_model
    {
        public user_model()
        {
            db = new User();
            lst_cong_viec = new List<string>();
        }
        public User db { get; set; }
        public List<string> lst_cong_viec { get; set; }
    }
    public class filter_data
    {
        public filter_data()
        {

        }
        public string search { get; set; }
    }
    public class check_error
    {
        public check_error()
        {

        }
        public string key { get; set; }
        public string value { get; set; }
    }
}
