﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Model;
using WebAPI.System;

namespace WebAPI.Part
{
    public static class sys_giang_vien_part
    {
        //private ApplicationDbContext _context;
        //public sys_giang_vien_part(ApplicationDbContext _context)
        //{
        //    this._context = _context;
        //}
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
            if (item.db.id_chuc_vu==0)
            {
                list_error.Add(set_error.set("db.id_chuc_vu", "Bắt buộc"));
            }
            if (item.db.id_khoa==0)
            {
                list_error.Add(set_error.set("db.id_khoa", "Bắt buộc"));
            }
            if (item.list_bo_mon == null)
            {
                list_error.Add(set_error.set("list_bo_mon", "Bắt buộc"));
            }
            //else
            //{
            //    var check_ma_giang_vien = _context.sys_giang_vien.Where(q => q.ma_giang_vien == item.db.ma_giang_vien && q.id != item.db.id).Count();
            //    if (check_ma_giang_vien>0)
            //    {
            //        list_error.Add(set_error.set("db.ma_giang_vien", "Trùng mã giảng viên!"));
            //    }
            //}
            if (string.IsNullOrEmpty(item.db.sdt))
            {
                list_error.Add(set_error.set("db.sdt", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.email))
            {
                list_error.Add(set_error.set("db.email", "Bắt buộc"));
            }
            if (string.IsNullOrEmpty(item.db.dia_chi))
            {
                list_error.Add(set_error.set("db.dia_chi", "Bắt buộc"));
            }
            return list_error;
        }
    }
}
