using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Model;
using WebAPI.System;

namespace WebAPI.Part
{
    public class sys_cau_hinh_admin_part
    {
        public static List<check_error> check_error_insert_update(sys_cau_hinh_admin_model item)
        {
            List<check_error> list_error = new List<check_error>();
            if (string.IsNullOrEmpty(item.db.title))
            {
                list_error.Add(set_error.set("db.title", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.title_footer))
            {
                list_error.Add(set_error.set("db.title_footer", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.name_footer))
            {
                list_error.Add(set_error.set("db.name_footer", "Bắt buộc"));
            }
            return list_error;
        }
    }
}
