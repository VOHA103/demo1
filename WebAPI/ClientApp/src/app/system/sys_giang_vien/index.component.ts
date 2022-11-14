import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { sys_giang_vien_popupComponent } from './popupAdd.component';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import { sys_khoa_service } from '../../service/sys_khoa.service';
@Component({
  selector: 'sys_giang_vien_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_giang_vien_indexComponent implements OnInit {
  public foods: any = [];
  public listData: any = [];
  public lst_status: any = [];
  public model: user_model;
  public loading = false;
  public lst_khoa: any = [];
  public lst_chuc_vu: any = [];
  total = 0;
  page = 1;
  limit = 10;
  filter = { search: '', total: '0', page: '0', limit: '10', status_del: '1',id_chuc_vu:'-1',id_khoa:'-1',id_chuyen_nghanh:'-1' };
  searchKey: string;
  constructor(
    private http: HttpClient,
    private sys_chuc_vu_service: sys_chuc_vu_service,
    private sys_khoa_service: sys_khoa_service,
    private sys_giang_vien_service: sys_giang_vien_service,
    public dialog: MatDialog
  ) {
    this.DataHanlder();
    this.get_list_khoa();
    this.get_list_chuc_vu();
  }
  get_list_khoa(): void {
    this.sys_khoa_service
      .get_list_khoa()
      .subscribe((data) =>  {
          var result:any;
        result=data;
        this.lst_khoa = result;
        });
  }
  get_list_chuc_vu(): void {
    this.sys_chuc_vu_service
      .get_list_chuc_vu()
      .subscribe((data) => {
        var result:any;
        result=data;
        this.lst_chuc_vu = result;
      });
  }
  DataHanlder(): void {
     this.loading = false;
     this.sys_giang_vien_service.DataHanlder(this.filter).subscribe((resp) => {
      var model:any;
      model=resp;
      this.listData = model.data;
      this.total=model.total,
       this.loading = true;
     });
   }
  openDialogDetail(item): void {
    debugger
    const dialogRef = this.dialog.open(sys_giang_vien_popupComponent, {
      width: '850px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.DataHanlder();
    });
  }
  goToPrevious(): void {
    this.page--;
    this.DataHanlder();
  }

  goToNext(): void {
    this.page++;
    this.DataHanlder();
  }

  goToPage(n: number): void {
    this.page = n;
    this.DataHanlder();
  }
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(sys_giang_vien_popupComponent, {
      width: '850px',
      data: {
        db: {
          id: '0',
        },
        list_bo_mon: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.DataHanlder();
    });
  }
  loadAPI() {
    this.loading = false;
    this.sys_giang_vien_service.getAll().subscribe((resp) => {
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
    this.sys_giang_vien_service.delete(id).subscribe((result) => {
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
    this.sys_giang_vien_service.reven_status(id).subscribe((result) => {
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
        name: 'Đang sử dụng',
      },
      {
        id: '2',
        name: 'Ngưng sử dụng',
      },
    ];
  }
}
