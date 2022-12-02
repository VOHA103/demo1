import { sys_cong_viec_giang_vien } from "../database/sys_cong_viec_giang_vien.data";
export class sys_cong_viec_giang_vien_model {
  db: sys_cong_viec_giang_vien;
  create_name: string;
  update_name: string;
  ten_giang_vien: string;
  ten_cong_viec: string;
  ten_loai_cong_viec: string;
  ten_chuc_vu: string;
  ten_khoa: string;
  so_gio: number | null;
  trang_thai: number | null;
  list_giang_vien: string[];
}
export class filter_thong_ke_user {
  id_loai_cong_viec: number | null;
  tu: Date | null;
  den: Date | null;
}
