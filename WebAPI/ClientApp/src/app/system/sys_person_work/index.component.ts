import { sys_cong_viec_service } from '../../service/sys_cong_viec.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { sys_loai_cong_viec_service } from '../../service/sys_loai_cong_viec.service';
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
  public model: user_model;
  public loading = false;
  filter = {
    search: '',
    total: '0',
    page: '0',
    limit: '10',
    status_del: 1,
    id_loai_cong_viec: -1,
  };
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  search:string="";
  p: number = 0;
  total: number = 100;
  resp: number;


  constructor(
    private http: HttpClient,
    private sys_cong_viec_service: sys_cong_viec_service,
    private sys_loai_cong_viec_service: sys_loai_cong_viec_service,
    public dialog: MatDialog
  ) {
    this.DataHanlder();
  }
  pageChangeEvent(event: number){
    this.p = event;
    this.DataHanlder();
}
  DataHanlder(): void {
    debugger;
    this.loading = false;
    this.sys_cong_viec_service.DataHanlder(this.filter).subscribe((resp) => {
      var model: any;
      this.listData=resp;
      this.total=this.resp;
      model = resp;
      this.listData = model.data;
      this.total = model.total;
      this.loading = true;
      this.pageIndex = model.pageIndex;
      this.pageSize = model.pageSize;
      this.totalRow = model.totalRow;
    });
  }

  delete(id): void {
    this.sys_cong_viec_service.delete(id).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
        this.DataHanlder();
      });
    });
  }
  reven_status(id): void {
    this.sys_cong_viec_service.reven_status(id).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
        this.DataHanlder();
      });
    });
  }
  get_list_person_cong_viec(): void {
    debugger;
    this.sys_loai_cong_viec_service.get_list_use().subscribe((result) => {
      this.list_loai_cong_viec = result;
    });
  }
  ngOnInit(): void {
    this.get_list_person_cong_viec();
    this.DataHanlder();
    this.lst_status = [
      {
        id: 1,
        name: 'Đang sử dụng',
      },
      {
        id: 2,
        name: 'Ngưng sử dụng',
      },
    ];
  }
}
