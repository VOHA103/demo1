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
@Component({
  selector: 'sys_chuc_vu_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],
})
export class sys_chuc_vu_popupComponent {
  public sys_chuc_vu_model = new sys_chuc_vu_model();
  public lst_status: any = [];
  public check_error: any = [];
  constructor(
    private http: HttpClient,
    private sys_chuc_vu_service: sys_chuc_vu_service,
    public dialog: MatDialog,
    private sys_user_service: sys_user_service,
    public dialogRef: MatDialogRef<sys_chuc_vu_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_chuc_vu_model
  ) {
    //this.sys_chuc_vu = data;
    this.sys_chuc_vu_model = data;
    if (this.sys_chuc_vu_model.db.id == 0) this.Save();
  }
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    this.sys_chuc_vu_service.add(this.sys_chuc_vu_model).subscribe((result) => {
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
    this.sys_chuc_vu_service
      .edit(this.sys_chuc_vu_model)
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
