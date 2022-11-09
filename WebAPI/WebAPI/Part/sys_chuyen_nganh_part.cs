using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Model;
using WebAPI.System;

namespace WebAPI.Part
{
    public static class sys_chuyen_nganh_part
    {
        public static List<check_error> check_error_insert_update(sys_chuyen_nganh_model item)
        {
            List<check_error> list_error = new List<check_error>();
            if (string.IsNullOrEmpty(item.db.ten_chuyen_nganh))
            {
                list_error.Add(set_error.set("db.ten_chuyen_nganh", "Bắt buộc"));
            }
            return list_error;
        }
    }
}
