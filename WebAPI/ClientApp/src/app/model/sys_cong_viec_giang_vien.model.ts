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

export interface filter_data_cong_viec_giang_vien {
  search: string;
  id_giang_vien: string;
  id_cong_viec: string;
  total: number;
  page: number;
  limit: number;
  status_del: number | null;
  id_chuc_vu: number | null;
  id_bo_mon: number | null;
  id_khoa: number | null;
}
