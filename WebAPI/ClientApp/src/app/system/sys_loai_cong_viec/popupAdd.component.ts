import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_loai_cong_viec_service } from '../../service/sys_loai_cong_viec.service';
import Swal from 'sweetalert2';
import { sys_user_service } from '../../service/sys_user.service';
import { sys_loai_cong_viec_model } from '@/app/model/sys_loai_cong_viec.model';
@Component({
  selector: 'sys_loai_cong_viec_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],
})
export class sys_loai_cong_viec_popupComponent {
  public sys_loai_cong_viec_model = new sys_loai_cong_viec_model();
  public lst_status: any = [];
  public lst_loai: any = [];
  public check_error: any = [];
  constructor(
    private http: HttpClient,
    private sys_loai_cong_viec_service: sys_loai_cong_viec_service,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<sys_loai_cong_viec_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_loai_cong_viec_model
  ) {
    //this.sys_loai_cong_viec_model = data;
    this.sys_loai_cong_viec_model = data;
    if (this.sys_loai_cong_viec_model.db.id == 0) this.Save();
  }
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    this.sys_loai_cong_viec_service
      .add(this.sys_loai_cong_viec_model)
      .subscribe((result) => {
        var data: any = result;
        this.check_error = data.error;
        if (this.check_error.length === 0) {
          this.Close();
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            showConfirmButton: false,
            timer: 2000,
          }).then((result) => {});
        }
      });
  }
  Edit(): void {
    this.sys_loai_cong_viec_service
      .edit(this.sys_loai_cong_viec_model)
      .subscribe((result) => {
        var data: any = result;
        this.check_error = data.error;
        if (this.check_error.length === 0) {
          this.Close();
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            showConfirmButton: false,
            timer: 2000,
          }).then((result) => {});
        }
      });
  }

  ngOnInit(): void {
    this.lst_loai=[
      {
        id: 1,
        name: 'Cá nhân',
      },
      {
        id: 2,
        name: 'Tập thể',
      },
    ];
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
