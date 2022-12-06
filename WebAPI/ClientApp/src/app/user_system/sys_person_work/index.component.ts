import { sys_cong_viec_service } from '../../service/sys_cong_viec.service';
import { sys_cong_viec_giang_vien_service } from '../../service/sys_cong_viec_giang_vien.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { sys_loai_cong_viec_service } from '../../service/sys_loai_cong_viec.service';
import { filter_data_cong_viec_giang_vien_user, filter_thong_ke_user, filter_thong_ke_user_data } from '@/app/model/sys_cong_viec_giang_vien.model';
@Component({
  selector: 'sys_cong_viec_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_person_work_indexComponent implements OnInit {
  public foods: any = [];
  public listData: any = [];
  public lst_status: any = [];
  public list_loai_cong_viec: any = [];
  public lst_cong_viec: any = [];
  public model: user_model;
  public loading = false;
  public filter = new filter_data_cong_viec_giang_vien_user();
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  search: string = '';
  p: number = 0;
  total: number = 100;
  resp: number;

  constructor(
    private sys_cong_viec_service: sys_cong_viec_service,
    private sys_cong_viec_giang_vien_service: sys_cong_viec_giang_vien_service,
    private sys_loai_cong_viec_service: sys_loai_cong_viec_service,
    public dialog: MatDialog
  ) {
    this.filter.id_cong_viec = "";
    this.filter.search = "";
    this.filter.status_del = -1;
    this.filter.den = new Date();
    this.filter.tu = new Date();
    this.filter.tu.setDate(this.filter.den.getDate() - 7);
    this.DataHanlderUser();
  }
  pageChangeEvent(event: number) {
    this.p = event;
    this.DataHanlderUser();
  }
  DataHanlderUser(): void {
    this.loading = false;
    this.sys_cong_viec_giang_vien_service
      .DataHanlderUser(this.filter)
      .subscribe((resp) => {
        var model: any;
        this.listData = resp;
        this.total = this.resp;
        model = resp;
        this.listData = model.data;
        this.total = model.total;
        this.loading = true;
        this.pageIndex = model.pageIndex;
        this.pageSize = model.pageSize;
        this.totalRow = model.totalRow;
      });
  }

  get_list_cong_viec(): void {
    this.sys_cong_viec_service.change_cong_viec_khoa().subscribe((result) => {
      this.lst_cong_viec = result;
      this.lst_cong_viec.splice(0, 0, { id: "", name: 'Tất cả' });
    });
  }

  export_Excel(): void {
    this.sys_cong_viec_giang_vien_service
      .ExportExcel(this.filter)
      .subscribe((resp) => {
        // var res;
        // debugger
        // res = resp;
        // console.log(res);
        // var downloadedFile = new Blob([res.body], { type: res.body.type });
        // const a = document.createElement('a');
        // a.setAttribute('style', 'display:none;');
        // document.body.appendChild(a);
        // a.href = URL.createObjectURL(downloadedFile);
        // a.target = '_dAblank';
        // a.download = 'DanhSachBill.xlsx';
        // a.click();
        // document.body.removeChild(a);
      });
  }
  ngOnInit(): void {
    this.get_list_cong_viec();
    this.DataHanlderUser();
    this.lst_status = [
      {
        id: 1,
        name: 'Hoàn thành',
      },
      {
        id: 2,
        name: 'Chưa hoàn thành',
      },
      {
        id: 3,
        name: 'Đang thực hiện',
      },
    ];
  }
}
