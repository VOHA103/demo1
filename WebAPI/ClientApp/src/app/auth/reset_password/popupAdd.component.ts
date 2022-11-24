import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import Swal from 'sweetalert2';
import { sys_user_service } from '../../service/sys_user.service';
import { sys_chuc_vu_model } from '@/app/model/sys_chuc_vu.model';
import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
@Component({
  selector: 'Doi_Mat_Khau_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],
})
export class reset_password_popupComponent {
  public sys_chuc_vu_model = new sys_chuc_vu_model();
  public lst_status: any = [];
  public check_error: any = [];
  public pass_old: string = '';
  public pass_new: string = '';
  public pass_new_reset: string = '';
  hide = true;
  hide1 = true;
  hide2 = true;
  constructor(
    private http: HttpClient,
    private sys_chuc_vu_service: sys_chuc_vu_service,
    public dialog: MatDialog,
    private sys_giang_vien_service: sys_giang_vien_service,
    private sys_user_service: sys_user_service,
    public dialogRef: MatDialogRef<reset_password_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_chuc_vu_model
  ) {
    this.submit();
  }
  Close(): void {
    this.dialogRef.close();
  }
  submit(): void {
    this.sys_giang_vien_service
      .reset_pass(this.pass_old, this.pass_new, this.pass_new_reset)
      .subscribe((result) => {
        this.check_error = result;
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
        // else
        //   Swal.fire({
        //     icon: 'warning',
        //     title: 'Thất bại',
        //     showConfirmButton: false,
        //     timer: 2000,
        //   }).then((result) => {
        //   });
      });
  }

  ngOnInit(): void {
  }
}
