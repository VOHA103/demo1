import { user_model } from '../../model/user.model';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_cau_hinh_admin_service } from '../../service/sys_cau_hinh_admin.service';
import Swal from 'sweetalert2';
import { User } from '@/app/database/user.data';
import { sys_cau_hinh_admin_model } from '@/app/model/sys_cau_hinh_admin.model';
import { sys_user_service } from '../../service/sys_user.service';
@Component({
  selector: 'sys_cau_hinh_admin_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],
})
export class sys_cau_hinh_admin_popupComponent {
  public sys_cau_hinh_admin_model = new sys_cau_hinh_admin_model();
  public lst_status: any = [];
  public check_error: any = [];
  public id_user: any;
  constructor(
    private http: HttpClient,
    private sys_cau_hinh_admin_service: sys_cau_hinh_admin_service,
    public dialog: MatDialog,

    private sys_user_service: sys_user_service,
    public dialogRef: MatDialogRef<sys_cau_hinh_admin_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_cau_hinh_admin_model
  ) {
    this.sys_cau_hinh_admin_model = data;
    this.get_profile_user();
  }
  public get_profile_user(): void {
    this.sys_user_service.get_profile_user().subscribe(
      (res: any) => {
        this.id_user = res.id;
        if (this.sys_cau_hinh_admin_model.db.id == 0) {
          this.Save();
          this.sys_cau_hinh_admin_model.db.create_by = this.id_user;
        } else {
          this.sys_cau_hinh_admin_model.db.update_by = this.id_user;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    this.sys_cau_hinh_admin_service.add(this.sys_cau_hinh_admin_model).subscribe((result) => {
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
    this.sys_cau_hinh_admin_service.edit(this.sys_cau_hinh_admin_model).subscribe((result) => {
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
