import { sys_cong_viec_service } from '../../service/sys_cong_viec.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { sys_cong_viec_popupComponent } from './popupAdd.component';
import { sys_loai_cong_viec_service } from '../../service/sys_loai_cong_viec.service';
@Component({
  selector: 'sys_cong_viec_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_cong_viec_indexComponent implements OnInit {
  public foods: any = [];
  public listData: any = [];
  public lst_status: any = [];
  public list_loai_cong_viec: any = [];
  public model: user_model;
  public loading = false;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  search:string="";
  p: number = 0;
  total: number = 100;
  resp: number;
  filter = { search: '', status_del: 1,id_loai_cong_viec:-1 };
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
  openDialogDetail(item): void {
    const dialogRef = this.dialog.open(sys_cong_viec_popupComponent, {
      width: '850px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.DataHanlder();
    });
  }
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(sys_cong_viec_popupComponent, {
      width: '850px',
      data: {
        db: {
          id: '0',
        },
        lst_cong_viec: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.DataHanlder();
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
  get_list_loai_cong_viec(): void {
    this.sys_loai_cong_viec_service.get_list_use().subscribe((result) => {
      this.list_loai_cong_viec = result;
      this.list_loai_cong_viec=this.list_loai_cong_viec.split(0,0,{"id":-1,"name":"Tất cả"});
    });
  }
  ngOnInit(): void {
    this.DataHanlder();
    this.get_list_loai_cong_viec();
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
