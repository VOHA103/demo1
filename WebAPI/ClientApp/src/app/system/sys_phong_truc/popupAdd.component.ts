import { sys_phong_truc_model } from '../../model/sys_phong_truc.model';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_phong_truc_service } from '../../service/sys_phong_truc.service';
import Swal from 'sweetalert2';
import { sys_user_service } from '../../service/sys_user.service';
import { sys_phong_truc } from '@/app/database/sys_phong_truc.data';
@Component({
  selector: 'sys_phong_truc_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],
})
export class sys_phong_truc_popupComponent {
  public sys_phong_truc_model = new sys_phong_truc_model();
  public lst_status: any = [];
  public check_error: any = [];
  constructor(
    private http: HttpClient,
    private sys_phong_truc_service: sys_phong_truc_service,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<sys_phong_truc_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_phong_truc_model
  ) {
    //this.sys_phong_truc = data;
    this.sys_phong_truc_model = data;
    if (this.sys_phong_truc_model.db.id == 0) 
    this.Save();
  }
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    this.sys_phong_truc_service
      .add(this.sys_phong_truc_model)
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
    this.sys_phong_truc_service.edit(this.sys_phong_truc_model).subscribe((result) => {
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
