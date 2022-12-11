using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Model;
using WebAPI.Support;
using WebAPI.System;

namespace WebAPI.Part
{
    public static class sys_giang_vien_part
    {
        private static readonly ApplicationDbContext _context;
        public static List<check_error> get_list_error_pass(string pass_old, string pass_new, string pass_reset, sys_giang_vien_model item)
        {
            return check_error_reset_pass(pass_old, pass_new, pass_reset, item);
        }
        public static List<check_error> check_error_reset_pass(string pass_old, string pass_new, string pass_reset, sys_giang_vien_model item)
        {
            List<check_error> list_error = new List<check_error>();
            if (pass_old == null)
            {
                list_error.Add(set_error.set("pass_old", "Bắt buộc"));
            }
            else
            if (item.db.pass_word != Libary.EncodeMD5(pass_old))
            {
                list_error.Add(set_error.set("pass_old", "Mật khẩu không tồn tại"));
            }

            if (pass_new == null)
            {
                list_error.Add(set_error.set("pass_new", "Bắt buộc"));
            }

            if (pass_reset == null)
            {
                list_error.Add(set_error.set("pass_reset", "Bắt buộc"));
            }


            if (string.IsNullOrEmpty(item.db.ngay_sinh.ToString()))
            {
                list_error.Add(set_error.set("db.ngay_sinh", "Bắt buộc"));
            }
            if (pass_new != pass_reset && pass_new != null && pass_reset != null)
            {
                list_error.Add(set_error.set("pass_reset", "Mật khẩu mới và xác nhận không khớp"));
            }
            return list_error;
        }
        public static List<check_error> get_list_error(sys_giang_vien_model item)
        {
            return check_error_insert_update(item);
        }
        public static List<check_error> check_error_insert_update(sys_giang_vien_model item)
        {
            List<check_error> list_error = new List<check_error>();
            if (string.IsNullOrEmpty(item.db.ten_giang_vien))
            {
                list_error.Add(set_error.set("db.ten_giang_vien", "Bắt buộc"));
            }
            if (item.db.id_chuc_vu == 0)
            {
                list_error.Add(set_error.set("db.id_chuc_vu", "Bắt buộc"));
            }
            if (item.db.id_khoa == 0)
            {
                list_error.Add(set_error.set("db.id_khoa", "Bắt buộc"));
            }
            if (item.db.id_chuyen_nghanh == 0)
            {
                list_error.Add(set_error.set("db.id_chuyen_nghanh", "Bắt buộc"));
            }
            if (item.db.id_bo_mon == null)
            {
                list_error.Add(set_error.set("db.id_bo_mon", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.sdt))
            {
                list_error.Add(set_error.set("db.sdt", "Bắt buộc"));
            }
            else
            {
                if (!string.IsNullOrEmpty(item.db.sdt))
                {

                    if (item.db.sdt.Length > 10)
                    {
                        list_error.Add(set_error.set("db.sdt", "Số điện thoại không hợp lệ"));

                    }
                    else
                    {
                        var rgSoDienThoai = new Regex(@"(^[\+]?[0-9]{10,13}$) 
            |(^[0-9]{3}-[0-9]{4}-[0-9]{4}$)
            |(^\+[0-9]{2}\s+[0-9]{2}[0-9]{8}$)
            |(^[(]?[\+]?[\s]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{2,4}[-\s\.]?[0-9]{2,4}[-\s\.]?[0-9]{2,4}[-\s\.]?[0-9]{0,4}[-\s\.]?$)");

                        var checkSDT = rgSoDienThoai.IsMatch(item.db.sdt);
                        if (checkSDT == false)
                        {
                            list_error.Add(set_error.set("db.sdt", "Số điẹn thoại không hợp lệ"));
                        }

                    }


                }
            }

            if (string.IsNullOrEmpty(item.db.email))
            {
                list_error.Add(set_error.set("db.email", "Bắt buộc"));
            }
            else
            {

                var rgEmail = new Regex(@"^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*"
                                   + "@"
                                   + @"((([\-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))\z");
                var checkEmail = rgEmail.IsMatch(item.db.email);
                if (checkEmail == false)
                {
                    list_error.Add(set_error.set("db.email", "Email không đúng định dạng"));
                }
            }
            if (string.IsNullOrEmpty(item.db.dia_chi))
            {
                list_error.Add(set_error.set("db.dia_chi", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.ma_giang_vien))
            {
                list_error.Add(set_error.set("db.ma_giang_vien", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.ngay_sinh.ToString()))
            {
                list_error.Add(set_error.set("db.ngay_sinh", "Bắt buộc"));
            }
            return list_error;
        }
        public static List<check_error> check_error_insert_update_admin(sys_giang_vien_model item)
        {
            List<check_error> list_error = new List<check_error>();
            if (string.IsNullOrEmpty(item.db.ten_giang_vien))
            {
                list_error.Add(set_error.set("db.ten_giang_vien", "Bắt buộc"));
            }
            if (item.db.id_chuc_vu == 0)
            {
                list_error.Add(set_error.set("db.id_chuc_vu", "Bắt buộc"));
            }
            if (item.db.id_khoa == 0)
            {
                list_error.Add(set_error.set("db.id_khoa", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.ngay_sinh.ToString()))
            {
                list_error.Add(set_error.set("db.ngay_sinh", "Bắt buộc"));
            }
            //if (item.db.id_chuyen_nghanh == 0)
            //{
            //    list_error.Add(set_error.set("db.id_chuyen_nghanh", "Bắt buộc"));
            //}
            //if (item.db.id_bo_mon == null)
            //{
            //    list_error.Add(set_error.set("db.id_bo_mon", "Bắt buộc"));
            //}
            if (string.IsNullOrEmpty(item.db.sdt))
            {
                list_error.Add(set_error.set("db.sdt", "Bắt buộc"));
            }
            else
            {
                if (!string.IsNullOrEmpty(item.db.sdt))
                {

                    if (item.db.sdt.Length > 10)
                    {
                        list_error.Add(set_error.set("db.sdt", "Số điện thoại không hợp lệ"));

                    }
                    else
                    {
                        var rgSoDienThoai = new Regex(@"(^[\+]?[0-9]{10,13}$) 
            |(^[0-9]{3}-[0-9]{4}-[0-9]{4}$)
            |(^\+[0-9]{2}\s+[0-9]{2}[0-9]{8}$)
            |(^[(]?[\+]?[\s]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{2,4}[-\s\.]?[0-9]{2,4}[-\s\.]?[0-9]{2,4}[-\s\.]?[0-9]{0,4}[-\s\.]?$)");

                        var checkSDT = rgSoDienThoai.IsMatch(item.db.sdt);
                        if (checkSDT == false)
                        {
                            list_error.Add(set_error.set("db.sdt", "Số điẹn thoại không hợp lệ"));
                        }

                    }


                }
            }

            if (string.IsNullOrEmpty(item.db.email))
            {
                list_error.Add(set_error.set("db.email", "Bắt buộc"));
            }
            else
            {

                var rgEmail = new Regex(@"^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*"
                                   + "@"
                                   + @"((([\-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))\z");
                var checkEmail = rgEmail.IsMatch(item.db.email);
                if (checkEmail == false)
                {
                    list_error.Add(set_error.set("db.email", "Email không đúng định dạng"));
                }
            }
            if (string.IsNullOrEmpty(item.db.dia_chi))
            {
                list_error.Add(set_error.set("db.dia_chi", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.ma_giang_vien))
            {
                list_error.Add(set_error.set("db.ma_giang_vien", "Bắt buộc"));
            }
            else
            {

            }
            return list_error;
        }
    }
}
