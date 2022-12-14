import { sys_khoa_service } from '../../service/sys_khoa.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { sys_khoa_popupComponent } from './popupAdd.component';
@Component({
  selector: 'sys_khoa_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_khoa_indexComponent implements OnInit {
  public foods: any = [];
  public listData: any = [];
  public lst_status: any = [];
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

  filter = { search: '',  status_del: '1' };

  constructor(
    private http: HttpClient,
    private sys_khoa_service: sys_khoa_service,
    public dialog: MatDialog
  ) {
    console.log(this.filter);

  }
  openDialogDetail(item): void {
    const dialogRef = this.dialog.open(sys_khoa_popupComponent, {
      width: '850px',
      data: item,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.DataHanlder();
    });
  }
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(sys_khoa_popupComponent, {
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
  pageChangeEvent(event: number){
    this.p = event;
    this.DataHanlder();
}
  DataHanlder(): void {
    this.loading = false;
    this.sys_khoa_service.DataHanlder(this.filter).subscribe((resp) => {
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
    this.sys_khoa_service.delete(id).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Th??nh c??ng',
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
        this.DataHanlder();
      });
    });
  }
  reven_status(id): void {
    this.sys_khoa_service.reven_status(id).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Th??nh c??ng',
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
        this.DataHanlder();
      });
    });
  }
  ngOnInit(): void {
    this.DataHanlder();
    this.DataHanlder();
    this.lst_status = [
      {
        id: '1',
        name: '??ang s??? d???ng',
      },
      {
        id: '2',
        name: 'Ng??ng s??? d???ng',
      },
    ];
  }
}
