
export interface sys_cong_viec {
  id: string;
  ten_cong_viec: string;
  id_loai_cong_viec: number;
  so_gio: number | null;
  ngay_bat_dau: string | null;
  gio_bat_dau: string;
  ngay_ket_thuc: string;
  create_by: string;
  create_date: string | null;
  update_by: string;
  update_date: string | null;
  status_del: number | null;
  loai: number | null;
  note: string;
}
