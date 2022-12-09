import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_cong_viec_giang_vien_service } from '../../service/sys_cong_viec_giang_vien.service';
import { sys_cong_viec_service } from '../../service/sys_cong_viec.service';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import { sys_khoa_service } from '../../service/sys_khoa.service';
import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
import { sys_bo_mon_service } from '../../service/sys_bo_mon.service';
import Swal from 'sweetalert2';
import { sys_cong_viec_giang_vien_model } from '@/app/model/sys_cong_viec_giang_vien.model';
@Component({
  selector: 'sys_cong_viec_giang_vien_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],
})
export class sys_cong_viec_giang_vien_admin_bo_mon_popupComponent {
  public sys_cong_viec_giang_vien_model = new sys_cong_viec_giang_vien_model();
  public lst_status: any = [];
  public list_cong_viec: any;
  public check_error: any = [];
  public list_giang_vien: any;
  public lst_khoa: any = [];
  public lst_chuc_vu: any = [];
  public lst_bo_mon: any = [];
  public list_option: any = [];
  public option: any;
  constructor(
    private http: HttpClient,
    private sys_cong_viec_giang_vien_service: sys_cong_viec_giang_vien_service,
    private sys_giang_vien_service: sys_giang_vien_service,
    private sys_cong_viec_service: sys_cong_viec_service,
    private sys_chuc_vu_service: sys_chuc_vu_service,
    private sys_khoa_service: sys_khoa_service,
    private sys_bo_mon_service: sys_bo_mon_service,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<sys_cong_viec_giang_vien_admin_bo_mon_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_cong_viec_giang_vien_model
  ) {
    this.list_option = [
      {
        id: -1,
        name: 'Tất cả',
      },
      {
        id: 1,
        name: 'Chọn',
      },
    ];
    this.sys_cong_viec_giang_vien_model.check_all=-1
    //this.sys_cong_viec_giang_vien = data;
    this.sys_cong_viec_giang_vien_model = data;
    if (this.sys_cong_viec_giang_vien_model.db.id == '0') this.Save();
  }
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    this.sys_cong_viec_giang_vien_service
      .create_cong_viec_bo_mon(this.sys_cong_viec_giang_vien_model)
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
    this.sys_cong_viec_giang_vien_service
      .edit(this.sys_cong_viec_giang_vien_model)
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
  get_list_giang_vien(): void {
    debugger
    this.sys_giang_vien_service.get_list_giang_vien_change_khoa_bo_mon().subscribe((result) => {
      this.list_giang_vien = result;
      this.list_giang_vien.splice(0,0,{id:"-1",name:"Tất cả"})
    });
  }
  get_list_cong_viec(): void {
    this.sys_cong_viec_service.change_cong_viec_khoa().subscribe((result) => {
      this.list_cong_viec = result;
    });
  }
  ngOnInit(): void {
    this.get_list_cong_viec();
    this.get_list_giang_vien();
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
