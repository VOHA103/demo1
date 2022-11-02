using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Model;
using WebAPI.System;

namespace WebAPI.Part
{
    public static class sys_phong_truc_part
    {
        public static List<check_error> check_error_insert_update(sys_phong_truc_model item)
        {
            List<check_error> list_error = new List<check_error>();
            if (string.IsNullOrEmpty(item.db.ten_phong_truc))
            {
                list_error.Add(set_error.set("db.ten_phong_truc", "Bắt buộc"));
            }
            
            return list_error;
        }
    }
}
