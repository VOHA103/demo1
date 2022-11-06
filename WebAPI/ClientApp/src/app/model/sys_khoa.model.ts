import { sys_khoa } from "../database/sys_khoa.data";

export class sys_khoa_model {
  db: sys_khoa;
  create_name: string;
  update_name: string;
}
export class filter_data_khoa {
  search: string;
  total: number | null;
  page: number | null;
  limit: number | null;
}
