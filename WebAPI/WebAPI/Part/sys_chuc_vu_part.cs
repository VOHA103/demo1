using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Model;
using WebAPI.System;

namespace WebAPI.Part
{
    public static class sys_chuc_vu_part
    {
        private static readonly ApplicationDbContext _context;
        public static List<check_error> check_error_insert_update(sys_chuc_vu_model item)
        {
            List<check_error> list_error = new List<check_error>();
            if (string.IsNullOrEmpty(item.db.ten_chuc_vu))
            {
                list_error.Add(set_error.set("db.ten_chuc_vu", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.code))
            {
                list_error.Add(set_error.set("db.code", "Bắt buộc"));
            }
            return list_error;
        }
    }
}
