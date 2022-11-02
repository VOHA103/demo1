import { user_model } from '../../model/user.model';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_cong_viec_service } from '../../service/sys_cong_viec.service';
import Swal from 'sweetalert2';
import { User } from '@/app/database/user.data';
import { sys_cong_viec_model } from '@/app/model/sys_cong_viec.model';
import { sys_loai_cong_viec_service } from '../../service/sys_loai_cong_viec.service';
@Component({
  selector: 'sys_cong_viec_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],
})
export class sys_cong_viec_popupComponent {
  public sys_cong_viec_model = new sys_cong_viec_model();
  public lst_status: any = [];
  public check_error: any = [];
  public list_loai_cong_viec: any = [];
  constructor(
    private http: HttpClient,
    private sys_cong_viec_service: sys_cong_viec_service,
    private sys_loai_cong_viec_service: sys_loai_cong_viec_service,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<sys_cong_viec_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_cong_viec_model
  ) {
    //this.user = data;
    this.sys_cong_viec_model = data;
    if (this.sys_cong_viec_model.db.id == '0')
     this.Save();
  }
  get_list_loai_cong_viec(): void {
    debugger
    this.sys_loai_cong_viec_service.get_list_use().subscribe((result) => {
      this.list_loai_cong_viec = result;
    });
  }
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    this.sys_cong_viec_service
      .add(this.sys_cong_viec_model)
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
    this.sys_cong_viec_service
      .edit(this.sys_cong_viec_model)
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
    this.get_list_loai_cong_viec();
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
