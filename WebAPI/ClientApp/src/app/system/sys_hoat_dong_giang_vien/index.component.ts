import { sys_hoat_dong_giang_vien_service } from '../../service/sys_hoat_dong_giang_vien.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { sys_hoat_dong_giang_vien_popupComponent } from './popupAdd.component';
@Component({
  selector: 'sys_hoat_dong_giang_vien_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_hoat_dong_giang_vien_indexComponent implements OnInit {
  public foods: any = [];
  public listData: any = [];
  public lst_status: any = [];
  public model: user_model;
  public loading = false;
  total = 0;
  page = 1;
  limit = 10;
  filter = { search: '',total: 0, page: 0, limit:10};
  searchKey: string;
  constructor(
    private http: HttpClient,
    private sys_hoat_dong_giang_vien_service: sys_hoat_dong_giang_vien_service,
    public dialog: MatDialog
  ) {}
//   reven_status(id): void {
//    this.sys_hoat_dong_service.reven_status(id).subscribe((result) => {
//      Swal.fire({
//        icon: 'success',
//        title: 'Thành công',
//        showConfirmButton: false,
//        timer: 2000,
//      }).then((result) => {
//        this.DataHanlder();
//      });
//    });
//  }
  openDialogDetail(item): void {
    const dialogRef = this.dialog.open(sys_hoat_dong_giang_vien_popupComponent, {
      width: '850px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadAPI();
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
    const dialogRef = this.dialog.open(sys_hoat_dong_giang_vien_popupComponent, {
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
      this.loadAPI();
    });
  }
  loadAPI() {
    this.loading = false;
    this.sys_hoat_dong_giang_vien_service.getAll().subscribe((resp) => {
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
  //   this.sys_hoat_dong_giang_vien_service.deleteUser(id).subscribe((result) => {
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Thành công',
  //       showConfirmButton: false,
  //       timer: 2000,
  //     }).then((result) => {
  //       this.loadAPI();
  //     });
  //   });
  }
  ngOnInit(): void {
    this.loadAPI();
    this.lst_status = [
      {
        id: '1',
        name: 'Thành viên',
      },
      {
        id: '2',
        name: 'Công việc',
      },
    ];
  }
}
