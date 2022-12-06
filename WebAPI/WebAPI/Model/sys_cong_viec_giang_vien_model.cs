using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.System;

namespace WebAPI.Model
{
    public class sys_cong_viec_giang_vien_model
    {
        public sys_cong_viec_giang_vien_model()
        {
            db = new sys_cong_viec_giang_vien();
        }
        public sys_cong_viec_giang_vien db { get; set; }
        public string create_name { get; set; }
        public string update_name { get; set; }
        public string ten_giang_vien { get; set; }
        public string ten_cong_viec { get; set; }
        public string ten_loai_cong_viec { get; set; }
        public string ten_chuc_vu { get; set; }
        public string ten_khoa { get; set; }
        public int? id_loai_cong_viec { get; set; }
        public int? so_gio { get; set; }
        //1 đã xong 2 chưa thực hiện 3 đang thực hiện
        public int? trang_thai { get; set; }
        public List<string> list_giang_vien { get; set; }
    }
    public class cong_viec_giang_vien_model{
        public cong_viec_giang_vien_model()
        {
            list_cong_viec = new List<cong_viec_model>();
        }
        public string ten_loai_cong_viec { get; set; }
        public List<cong_viec_model> list_cong_viec { get; set; }

    }
    public class cong_viec_ref_model
    {

        public string ten_cong_viec { get; set; }
        public DateTime? ngay_bat_dau { get; set; }
        public DateTime? ngay_ket_thuc { get; set; }
        public int? so_gio { get; set; }
        public int? trang_thai { get; set; }
    }
    public class cong_viec_model
    {

        public string ten_cong_viec { get; set; }
        public int? so_gio { get; set; }
        public int? loai { get; set; }
        public int? so_gio_cv { get; set; }
    }
    public class filter_data_bo_mon_CV
    {
        public string id_cong_viec { get; set; }
        public string search { get; set; }
        public int? id_loai_cong_viec { get; set; }
        public int? status_del { get; set; }
        public DateTime? tu { get; set; }
        public DateTime? den { get; set; }

    }
    public class filter_thong_ke_user_data
    {
        public string id_cong_viec { get; set; }
        public string search { get; set; }
        public int? id_loai_cong_viec { get; set; }
        public DateTime? tu { get; set; }
        public DateTime? den { get; set; }

    }
    public class filter_thong_ke_user
    {
        public int? id_loai_cong_viec { get; set; }
        public DateTime? tu { get; set; }
        public DateTime? den { get; set; }

    }
    public class filter_thong_ke
    {
        public string id_cong_viec { get; set; }
        public int? id_chuc_vu { get; set; }
        public int? id_khoa { get; set; }
        public int? id_bo_mon { get; set; }
        public int? status_del { get; set; }
        public DateTime? tu { get; set; }
        public DateTime? den { get; set; }

    }
    public class filter_cong_viec_giang_vien_khoa
    {
        public string search { get; set; }
        public string id_giang_vien { get; set; }
        public string id_cong_viec { get; set; }
        public int? id_bo_mon { get; set; }
        public int? status_del { get; set; }
        public int? id_loai_cong_viec { get; set; }

    }
    public class filter_data_cong_viec_giang_vien
    {
        public string search { get; set; }
        public string id_giang_vien { get; set; }
        public string id_cong_viec { get; set; }
        public int? status_del { get; set; }
        public int? id_chuc_vu { get; set; }
        public int? id_bo_mon { get; set; }
        public int? id_khoa { get; set; }
        public int? id_loai_cong_viec { get; set; }

    }
    public class filter_data_cong_viec_giang_vien_user
    {
        public string search { get; set; }
        public string id_cong_viec { get; set; }
        public int? status_del { get; set; }
        public DateTime? tu { get; set; }
        public DateTime? den { get; set; }

    }
}
