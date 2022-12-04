import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, Inject, IterableDiffers } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import { sys_khoa_service } from '../../service/sys_khoa.service';
import { sys_bo_mon_service } from '../../service/sys_bo_mon.service';
import Swal from 'sweetalert2';
import { sys_giang_vien_model } from '@/app/model/sys_giang_vien.model';
@Component({
  selector: 'sys_giang_vien_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],

})
export class sys_giang_vien_popupComponent {
  public sys_giang_vien_model = new sys_giang_vien_model();
  public lst_status: any = [];
  public lst_khoa: any = [];
  public lst_chuc_vu: any = [];
  public lst_bo_mon: any = [];
  public check_error: any = [];
  public lst_chuyen_nghanh: any = [];
  public lst_gioi_tinh: any = [];
  today = new Date();
  constructor(
    private http: HttpClient,
    private sys_giang_vien_service: sys_giang_vien_service,
    private sys_chuc_vu_service: sys_chuc_vu_service,
    private sys_khoa_service: sys_khoa_service,
    private sys_bo_mon_service: sys_bo_mon_service,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<sys_giang_vien_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_giang_vien_model
  ) {
    //this.sys_giang_vien = data;
    this.sys_giang_vien_model = data;
    if (this.sys_giang_vien_model.db.id == '0'){
       this.Save();
    }
  }
  bind_data(): void {
    this.sys_giang_vien_model.db.username=this.sys_giang_vien_model.db.ma_giang_vien;
  }
  get_list_bo_mon(): void {
    this.sys_bo_mon_service
      .get_list_bo_mon()
      .subscribe((data) => (this.lst_bo_mon = data)
      );
  }
  get_list_khoa(): void {
    this.sys_khoa_service
      .get_list_khoa()
      .subscribe((data) =>  {
          var result:any;
        result=data;
        this.lst_khoa = result;
        debugger
        this.sys_giang_vien_model.db.id_khoa=this.lst_khoa[0].id
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
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    debugger
    this.sys_giang_vien_service
      .add(this.sys_giang_vien_model)
      .subscribe((result) => {
        var data: any = result;
        this.check_error = data.error;
        if (this.check_error.length === 0) {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            showConfirmButton: false,
            timer: 2000,
          }).then((result) => {
            this.Close();
          });
        }
      });
  }
  Edit(): void {
    this.sys_giang_vien_service
      .edit(this.sys_giang_vien_model)
      .subscribe((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          showConfirmButton: false,
          timer: 2000,
        }).then((result) => {
          this.Close();
        });
      });
  }

  ngOnInit(): void {
    this.get_list_chuc_vu();
    this.get_list_khoa();
    this.get_list_bo_mon();
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
    this.lst_gioi_tinh = [
      {
        id: 1,
        name: 'Nam',
      },
      {
        id: 2,
        name: 'Nữ',
      },
      {
        id: 3,
        name: 'Khác',
      },
    ];
    this.lst_chuyen_nghanh = [
      {
        id: 1,
        name: 'Công Nghệ Thông Tin',
      },
      {
        id: 2,
        name: 'An Toàn Thông Tin',
      }
    ];
    this.sys_giang_vien_model.db.id_chuyen_nghanh=this.lst_chuyen_nghanh[0].id;
    this.sys_giang_vien_model.db.id_khoa=this.lst_khoa[0].id;
    this.sys_giang_vien_model.db.id_chuc_vu=this.lst_chuc_vu[0].id;
  }
}
