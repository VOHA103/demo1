import { sys_ky_truc_khoa_model } from '../../model/sys_ky_truc_khoa.model';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_ky_truc_khoa_service } from '../../service/sys_ky_truc_khoa.service';
import Swal from 'sweetalert2';
import { sys_ky_truc_khoa } from '@/app/database/sys_ky_truc_khoa.data';
@Component({
  selector: 'sys_ky_truc_khoa_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],
})
export class sys_ky_truc_khoa_popupComponent {
  public sys_ky_truc_khoa_model = new sys_ky_truc_khoa_model();
  public lst_status: any = [];
  public check_error: any = [];
  constructor(
    private http: HttpClient,
    private sys_ky_truc_khoa_service: sys_ky_truc_khoa_service,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<sys_ky_truc_khoa_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_ky_truc_khoa_model
  ) {
    //this.sys_ky_truc_khoa = data;
    this.sys_ky_truc_khoa_model = data;
    if (this.sys_ky_truc_khoa_model.db.id == 0) 
    this.Save();
  }
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    this.sys_ky_truc_khoa_service.add(this.sys_ky_truc_khoa_model).subscribe((result) => {
      var data: any = result;
      this.check_error = data.error;
      if (this.check_error.length === 0) {
        this.Close();
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          showConfirmButton: false,
          timer: 2000,
        }).then((result) => { });
      }
    });
  }
  Edit(): void {
    this.sys_ky_truc_khoa_service.edit(this.sys_ky_truc_khoa_model).subscribe((result) => {
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
        name: 'Sử dụng',
      },
      {
        id: '2',
        name: 'Ngưng sử dụng',
      },
    ];
  }
}
