import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_chuyen_nganh_service } from '../../service/sys_chuyen_nganh.service';
import Swal from 'sweetalert2';
import { sys_user_service } from '../../service/sys_user.service';
import { sys_chuyen_nganh_model } from '@/app/model/sys_chuyen_nganh.model';
@Component({
  selector: 'sys_chuyen_nganh_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],
})
export class sys_chuyen_nganh_popupComponent {
  public sys_chuyen_nganh_model = new sys_chuyen_nganh_model();
  public lst_status: any = [];
  public check_error: any = [];
  constructor(
    private http: HttpClient,
    private sys_chuyen_nganh_service: sys_chuyen_nganh_service,
    public dialog: MatDialog,
    private sys_user_service: sys_user_service,
    public dialogRef: MatDialogRef<sys_chuyen_nganh_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_chuyen_nganh_model
  ) {
    //this.sys_chuyen_nganh = data;
    this.sys_chuyen_nganh_model = data;
    if (this.sys_chuyen_nganh_model.db.id == 0) this.Save();
  }
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    this.sys_chuyen_nganh_service.add(this.sys_chuyen_nganh_model).subscribe((result) => {
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
    this.sys_chuyen_nganh_service
      .edit(this.sys_chuyen_nganh_model)
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
