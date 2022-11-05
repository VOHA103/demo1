using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Model;
using WebAPI.System;

namespace WebAPI.Part
{
    public static class sys_cong_viec_giang_vien_part
    {
        public static List<check_error> check_error_insert_update(sys_cong_viec_giang_vien_model item)
        {
            List<check_error> list_error = new List<check_error>();
            if (string.IsNullOrEmpty(item.db.id_cong_viec))
            {
                list_error.Add(set_error.set("db.id_cong_viec", "Bắt buộc"));
            }
            return list_error;
        }
    }
}
