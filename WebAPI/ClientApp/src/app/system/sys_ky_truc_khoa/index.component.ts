import { sys_ky_truc_khoa_service } from '../../service/sys_ky_truc_khoa.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_ky_truc_khoa_model } from '@/app/model/sys_ky_truc_khoa.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { sys_ky_truc_khoa_popupComponent } from './popupAdd.component';
@Component({
  selector: 'sys_ky_truc_khoa_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_ky_truc_khoa_indexComponent implements OnInit {

  public foods: any = [];
  public listData: any = [];
  public lst_status: any = [];
  public model: sys_ky_truc_khoa_model;
  public loading = false;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  search:string="";
  p: number = 0;
  total: number = 100;
  resp: number;
  filter = { search: '', total: '0', page: '0', limit: '10', status_del: '1' };
  searchKey: string;  constructor(
    private http: HttpClient,
    private sys_ky_truc_khoa_service: sys_ky_truc_khoa_service,
    public dialog: MatDialog
  ) {
    this.DataHanlder();
  }
 DataHanlder(): void {
    this.loading = false;
    this.sys_ky_truc_khoa_service.DataHanlder(this.filter).subscribe((resp) => {
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

  pageChangeEvent(event: number){
    this.p = event;
    this.DataHanlder();
}
  openDialogDetail(item): void {
    const dialogRef = this.dialog.open(sys_ky_truc_khoa_popupComponent, {
      width: '850px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.DataHanlder();
    });
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(sys_ky_truc_khoa_popupComponent, {
      width: '850px',
      data: {
        db: {
          id: 0,
        },
        lst_cong_viec: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.DataHanlder();
    });
  }
  loadAPI() {
    this.loading = false;
    this.sys_ky_truc_khoa_service.getAll().subscribe((resp) => {
      this.listData=resp;
      // var result:any;
      // result = resp;
      // this.listData=result.data_list;
      // this.total=result.total,
      // this.page = result.page,
      // this.limit = result.limit,
      this.loading = true;
    });
  }
   delete(id): void {
    this.sys_ky_truc_khoa_service.delete(id).subscribe((result) => {
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
    this.sys_ky_truc_khoa_service.reven_status(id).subscribe((result) => {
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
  ngOnInit(): void {
    this.DataHanlder();
    this.lst_status = [
      {
        id: '1',
        name: 'Sử dụng',
      },
      {
        id: '2',
        name: 'Ngưng sử dụng',
      },
    ];
  }
}
