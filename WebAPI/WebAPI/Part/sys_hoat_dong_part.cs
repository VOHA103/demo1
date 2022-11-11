using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Model;
using WebAPI.System;

namespace WebAPI.Part
{
    public static class sys_hoat_dong_part
    {
        private static readonly ApplicationDbContext _context;
        public static List<check_error> check_error_insert_update(sys_hoat_dong_model item)
        {
            List<check_error> list_error = new List<check_error>();
            if (string.IsNullOrEmpty(item.db.ten_hoat_dong))
            {
                list_error.Add(set_error.set("db.ten_hoat_dong", "Bắt buộc"));
            }
            return list_error;
        }
    }
}
