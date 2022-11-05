import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_cong_viec_giang_vien_service } from '../../service/sys_cong_viec_giang_vien.service';
import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
import { sys_cong_viec_service } from '../../service/sys_cong_viec.service';
import Swal from 'sweetalert2';
import { sys_cong_viec_giang_vien_model } from '@/app/model/sys_cong_viec_giang_vien.model';
@Component({
  selector: 'sys_cong_viec_giang_vien_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],
})
export class sys_cong_viec_giang_vien_popupComponent {
  public sys_cong_viec_giang_vien_model = new sys_cong_viec_giang_vien_model();
  public lst_status: any = [];
  public list_giang_vien: any;
  public list_cong_viec: any;
  public check_error: any = [];
  constructor(
    private http: HttpClient,
    private sys_cong_viec_giang_vien_service: sys_cong_viec_giang_vien_service,
    private sys_giang_vien_service: sys_giang_vien_service,
    private sys_cong_viec_service:sys_cong_viec_service,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<sys_cong_viec_giang_vien_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_cong_viec_giang_vien_model
  ) {
    //this.sys_cong_viec_giang_vien = data;
    this.sys_cong_viec_giang_vien_model = data;
    if (this.sys_cong_viec_giang_vien_model.db.id == '0') this.Save();
  }
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    this.sys_cong_viec_giang_vien_service
      .add(this.sys_cong_viec_giang_vien_model)
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
    this.sys_giang_vien_service.get_list_giang_vien().subscribe((result) => {
      this.list_giang_vien = result;
      console.log(this.list_giang_vien);

    });
  }
  get_list_cong_viec(): void {
    this.sys_cong_viec_service.get_list_cong_viec().subscribe((result) => {
      (this.list_cong_viec = result)
      console.log(this.list_cong_viec)
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
