using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Model;

namespace WebAPI.Part
{
    public class user_part
    {
        public static List<check_error> check_error_insert_update(user_model item)
        {
            List<check_error> list_error = new List<check_error>();

            if (string.IsNullOrEmpty(item.db.name))
            {
                list_error.Add(generate_error("db.name", "Tên không được để trống"));
            }
            return list_error;
        }
        public static check_error generate_error(string key, string value)
        {
            check_error check = new check_error();
            check.key = key;
            check.value = value;
            return check;
        }
    }
}
