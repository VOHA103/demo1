export interface sys_giang_vien {
  id: string;
  id_chuc_vu: number | null;
  id_khoa: number | null;
  gioi_tinh: number | null;
  id_bo_mon: number| null;
  id_chuyen_nghanh: number | null;
  ten_giang_vien: string;
  ma_giang_vien: string;
  sdt: string;
  email: string;
  dia_chi: string;
  ngay_sinh: string | null;
  username: string;
  pass_word: string;
  create_by: string;
  create_date: string | null;
  update_by: string;
  update_date: string | null;
  status_del: number | null;
  note: string;
}
