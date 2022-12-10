using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Model;
using WebAPI.System;

namespace WebAPI.Part
{
    public static class sys_cong_viec_part
    {
        private static readonly ApplicationDbContext _context;
        public static List<check_error> check_error_update(sys_cong_viec_model item)
        {
            List<check_error> list_error = new List<check_error>();
            if (string.IsNullOrEmpty(item.db.ten_cong_viec))
            {
                list_error.Add(set_error.set("db.ten_cong_viec", "Bắt buộc"));
            }
            if (item.db.id_loai_cong_viec == 0)
            {
                list_error.Add(set_error.set("db.id_loai_cong_viec", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.so_gio.ToString()))
            {
                list_error.Add(set_error.set("db.so_gio", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.loai.ToString()))
            {
                list_error.Add(set_error.set("db.loai", "Bắt buộc"));
            }
            return list_error;
        }
        public static List<check_error> check_error_insert_update(sys_cong_viec_model item)
        {
            List<check_error> list_error = new List<check_error>();
            if (string.IsNullOrEmpty(item.db.ten_cong_viec))
            {
                list_error.Add(set_error.set("db.ten_cong_viec", "Bắt buộc"));
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
            if (item.db.id_loai_cong_viec==0)
            {
                list_error.Add(set_error.set("db.id_loai_cong_viec", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.so_gio.ToString()))
            {
                list_error.Add(set_error.set("db.so_gio", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.loai.ToString()))
            {
                list_error.Add(set_error.set("db.loai", "Bắt buộc"));
            }
            if (item.gio==null)
            {
                list_error.Add(set_error.set("gio", "Bắt buộc"));
            }
            if (item.phut == null)
            {
                list_error.Add(set_error.set("phut", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.id_bo_mon.ToString()))
            {
                list_error.Add(set_error.set("db.id_bo_mon", "Bắt buộc"));
            }
            if (item.list_giang_vien.Count()==0 || item.list_giang_vien==null)
            {
                list_error.Add(set_error.set("list_giang_vien", "Bắt buộc"));
            }
            return list_error;
        }
    }
}
