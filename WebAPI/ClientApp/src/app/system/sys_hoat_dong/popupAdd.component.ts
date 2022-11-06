import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_hoat_dong_service } from '../../service/sys_hoat_dong.service';
import Swal from 'sweetalert2';
import { sys_hoat_dong_model } from '../../model/sys_hoat_dong.model';
@Component({
  selector: 'sys_hoat_dong_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],
})
export class sys_hoat_dong_popupComponent {
  public sys_hoat_dong_model = new sys_hoat_dong_model();
  public lst_status: any = [];
  public check_error: any = [];
  public id_hoat_dong: any;
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private sys_hoat_dong_service: sys_hoat_dong_service,
    public dialogRef: MatDialogRef<sys_hoat_dong_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_hoat_dong_model
  ) {
    this.sys_hoat_dong_model = data;
    if(this.sys_hoat_dong_model.db.id==0)
    this.Save();
  }


  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    this.sys_hoat_dong_service.add(this.sys_hoat_dong_model).subscribe((result) => {
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
    this.sys_hoat_dong_service.edit(this.sys_hoat_dong_model).subscribe((result) => {
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
