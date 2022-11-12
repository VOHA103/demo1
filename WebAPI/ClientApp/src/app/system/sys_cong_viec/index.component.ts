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
  total = 0;
  page = 1;
  limit = 10;
  filter = { search: '', total: '0', page: '0', limit: '10', status_del: 1,id_loai_cong_viec:-1 };
  searchKey: string;
  constructor(
    private http: HttpClient,
    private sys_cong_viec_service: sys_cong_viec_service,
    private sys_loai_cong_viec_service: sys_loai_cong_viec_service,
    public dialog: MatDialog
  ) {
    this.DataHanlder();
  }
  DataHanlder(): void {
    debugger
     this.loading = false;
     this.sys_cong_viec_service.DataHanlder(this.filter).subscribe((resp) => {
      var model:any;
      model=resp;
      this.listData = model.data;
      this.total=model.total,
       this.loading = true;
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
  getOrders(): void {
    // this._salesData.getOrders(this.page, this.limit)
    //   .subscribe(res => {
    //     console.log('Result from getOrders: ', res);
    //     this.orders = res['page']['data'];
    //     this.total = res['page'].total;
    //     this.loading = false;
    //   });
  }
  goToPrevious(): void {
    this.page--;
    this.getOrders();
  }

  goToNext(): void {
    this.page++;
    this.getOrders();
  }

  goToPage(n: number): void {
    this.page = n;
    this.getOrders();
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
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
  loadAPI() {
    this.loading = false;
    this.sys_cong_viec_service.getAll().subscribe((resp) => {
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
    debugger;
    this.sys_loai_cong_viec_service.get_list_use().subscribe((result) => {
      this.list_loai_cong_viec = result;
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
