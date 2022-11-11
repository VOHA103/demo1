using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Model;
using WebAPI.System;

namespace WebAPI.Part
{
    public static class sys_giang_vien_truc_khoa_part
    {
        private static readonly ApplicationDbContext _context;
        public static List<check_error> check_error_insert_update(sys_giang_vien_truc_khoa_model item)
        {
            List<check_error> list_error = new List<check_error>();
            if (string.IsNullOrEmpty(item.db.id_giang_vien))
            {
                list_error.Add(set_error.set("db.id_giang_vien", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.id_ky_truc.ToString()))
            {
                list_error.Add(set_error.set("db.id_ky_truc", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.id_phong_truc.ToString()))
            {
                list_error.Add(set_error.set("db.id_phong_truc", "Bắt buộc"));
            }
            return list_error;
        }
    }
}
