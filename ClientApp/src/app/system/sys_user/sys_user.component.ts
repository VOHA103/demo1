import { sys_user_service } from './../../service/sys_user.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_user_popupComponent } from './sys_user_popup.component';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'sys_user_index',
  templateUrl: './sys_user.component.html',
  styleUrls: ['./sys_user.component.scss'],
})
export class sys_user_indexComponent implements OnInit {
  public foods: any = [];
  public listData: any = [];
  public lst_status: any = [];
  public model: user_model;
  total = 0;
  page = 1;
  limit = 10;
  searchKey: string;
 @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private http: HttpClient,
    private sys_user_service: sys_user_service,
    public dialog: MatDialog
  ) {

  }
  openDialogDetail(item): void {
    const dialogRef = this.dialog.open(sys_user_popupComponent, {
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
    // console.log('Previous Button Clicked!');
    this.page--;
    this.getOrders();
  }

  goToNext(): void {
    // console.log('Next Button Clicked!');
    this.page++;
    this.getOrders();
  }

  goToPage(n: number): void {
    this.page = n;
    this.getOrders();
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    debugger
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(sys_user_popupComponent, {
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
    this.sys_user_service.getAll().subscribe((data) => {
      this.listData = data;
      // let array=data.map(data =>{
      //   return {
      //     $key: data.db.name,
      //     ...data.payload.val()
      //   }
      // })
      // this.listData=new MatTableDataSource(array)
      // this.listData.paginator=this.paginator
    });
  }
  delete(id): void {
    this.sys_user_service.deleteUser(id).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
        this.loadAPI();
      });
    });
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
