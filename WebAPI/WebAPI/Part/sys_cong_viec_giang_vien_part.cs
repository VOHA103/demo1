using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Model;
using WebAPI.System;

namespace WebAPI.Part
{
    public static class sys_cong_viec_giang_vien_part
    {
        private static readonly ApplicationDbContext _context;
        public static List<check_error> check_error_insert_update(sys_cong_viec_giang_vien_model item)
        {
            List<check_error> list_error = new List<check_error>();
            if (string.IsNullOrEmpty(item.db.id_cong_viec))
            {
                list_error.Add(set_error.set("db.id_cong_viec", "Bắt buộc"));
            }
            if (item.db.id_chuc_vu==null)
            {
                list_error.Add(set_error.set("db.id_chuc_vu", "Bắt buộc"));
            }
            if (item.db.id_khoa== null)
            {
                list_error.Add(set_error.set("db.id_khoa", "Bắt buộc"));
            }
            if (item.list_giang_vien== null)
            {
                list_error.Add(set_error.set("list_giang_vien", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.ngay_ket_thuc.ToString()))
            {
                list_error.Add(set_error.set("db.ngay_ket_thuc", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.ngay_bat_dau.ToString()))
            {
                list_error.Add(set_error.set("db.ngay_bat_dau", "Bắt buộc"));
            }
            if (!string.IsNullOrEmpty(item.db.ngay_ket_thuc.ToString()) && !string.IsNullOrEmpty(item.db.ngay_bat_dau.ToString()))
            {
                if (item.db.ngay_ket_thuc < item.db.ngay_bat_dau)
                {
                    list_error.Add(set_error.set("db.ngay_ket_thuc", "Ngày kết thúc lớn hơn ngày bắt đầu"));
                }
            }
            return list_error;
        }
        public static List<check_error> check_error_insert_update_bo_mon_khoa(sys_cong_viec_giang_vien_model item)
        {
            List<check_error> list_error = new List<check_error>();
            if (string.IsNullOrEmpty(item.db.id_cong_viec))
            {
                list_error.Add(set_error.set("db.id_cong_viec", "Bắt buộc"));
            }
            if (item.check_all == 1 && item.list_giang_vien == null)
            {
                list_error.Add(set_error.set("list_giang_vien", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.ngay_ket_thuc.ToString()))
            {
                list_error.Add(set_error.set("db.ngay_ket_thuc", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.ngay_bat_dau.ToString()))
            {
                list_error.Add(set_error.set("db.ngay_bat_dau", "Bắt buộc"));
            }
            
            if (!string.IsNullOrEmpty(item.db.ngay_ket_thuc.ToString()) && !string.IsNullOrEmpty(item.db.ngay_bat_dau.ToString()))
            {
                if (item.db.ngay_ket_thuc < item.db.ngay_bat_dau)
                {
                    list_error.Add(set_error.set("db.ngay_ket_thuc", "Ngày kết thúc lớn hơn ngày bắt đầu"));
                }
            }
            return list_error;
        }
    }
}
