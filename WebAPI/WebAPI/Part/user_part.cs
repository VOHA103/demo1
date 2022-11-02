﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Model;
using WebAPI.System;

namespace WebAPI.Part
{
    public static class user_part
    {
        public static List<check_error> check_error_insert_update(user_model item)
        {
            List<check_error> list_error = new List<check_error>();
            if (string.IsNullOrEmpty(item.db.name))
            {
                list_error.Add(set_error.set("db.name", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.pass))
            {
                list_error.Add(set_error.set("db.pass", "Bắt buộc"));
            }
            return list_error;
        }
    }
}
