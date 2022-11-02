using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Model;
using WebAPI.System;

namespace WebAPI.Part
{
    public static class sys_ky_truc_khoa_part
    {
        public static List<check_error> check_error_insert_update(sys_ky_truc_khoa_model item)
        {
            List<check_error> list_error = new List<check_error>();
            if (string.IsNullOrEmpty(item.db.ten_ky))
            {
                list_error.Add(set_error.set("db.ten_ky", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.thoi_gian_bat_dau.ToString()))
            {
                list_error.Add(set_error.set("db.thoi_gian_bat_dau", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.thoi_gian_ket_thuc.ToString()))
            {
                list_error.Add(set_error.set("db.thoi_gian_bat_dau", "Bắt buộc"));
            }
            return list_error;
        }
    }
}
