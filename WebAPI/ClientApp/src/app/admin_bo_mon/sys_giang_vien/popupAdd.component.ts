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
import { sys_chuyen_nganh_service } from '@/app/service/sys_chuyen_nghanh.service';
@Component({
  selector: 'sys_giang_vien_khoa_bo_mon_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],

})
export class sys_giang_vien_khoa_bo_mon_popupComponent {
  public record = new sys_giang_vien_model();
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
    private sys_chuyen_nghanh_service:sys_chuyen_nganh_service,
    private sys_khoa_service: sys_khoa_service,
    private sys_bo_mon_service: sys_bo_mon_service,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<sys_giang_vien_khoa_bo_mon_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_giang_vien_model
  ) {
    this.record = data;
    this.get_list_chuc_vu();
    this.get_list_bo_mon();
    this.get_list_chuyen_nganh();
    if (this.record.db.id == '0'){
       this.Save();
    }
  }
  bind_data(): void {
    this.record.db.username=this.record.db.ma_giang_vien;
  }
  get_list_bo_mon(): void {
    this.sys_bo_mon_service
      .get_list_bo_mon()
      .subscribe((data) => (this.lst_bo_mon = data)
      );
  }
  get_list_chuc_vu(): void {
    this.sys_chuc_vu_service
      .get_list_chuc_vu_change()
      .subscribe((data) => {
        var result:any;
        result=data;
        this.lst_chuc_vu = result;
        if (this.record.db.id == '0'){
          this.record.db.id_chuc_vu=this.lst_chuc_vu[0].id;
       }
      });
  }
  get_list_chuyen_nganh(): void {
    this.sys_chuyen_nghanh_service
      .get_list_chuyen_nganh()
      .subscribe((data) => {
        var result:any;
        result=data;
        this.lst_chuyen_nghanh = result;
        if (this.record.db.id == '0'){
          this.record.db.id_chuyen_nghanh=this.lst_chuyen_nghanh[0].id;
       }
      });
  }
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    this.sys_giang_vien_service
      .create_giang_vien_khoa_bo_mon(this.record)
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
      .edit(this.record)
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
  }
}
