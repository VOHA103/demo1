import { sys_cong_viec } from "../database/sys_cong_viec.data";
export class sys_cong_viec_model {
  db: sys_cong_viec;
  create_name: string;
  update_name: string;
  ten_loai_cong_viec: string;
  gio: string;
  phut: string;
  id_chuc_vu: number | null;
  id_khoa: number | null;
  id_bo_mon: number | null;
  list_giang_vien: string[];
}

export interface filter_data_cong_viec {
  search: string;
  id_loai_cong_viec: number;
  total: string;
  page: string;
  limit: string;
  status_del: number;
}
