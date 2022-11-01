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
@Component({
  selector: 'sys_cong_viec_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],
})
export class sys_cong_viec_popupComponent {
  public user_model = new user_model();
  public lst_status: any = [];
  public check_error: any = [];
  constructor(
    private http: HttpClient,
    private sys_cong_viec_service: sys_cong_viec_service,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<sys_cong_viec_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: user_model
  ) {
    //this.user = data;
    this.user_model = data;
    if (this.user_model.db.id == '0') this.Save();
  }
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    // this.sys_cong_viec_service.addUser(this.user_model).subscribe((result) => {
    //   var data: any = result;
    //   this.check_error = data.error;
    //   if (this.check_error.length === 0) {
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'Thành công',
    //       showConfirmButton: false,
    //       timer: 2000,
    //     }).then((result) => {
    //       this.Close();
    //     });
    //   }
    // });
    // console.log(this.user_model);
  }
  Edit(): void {
    // this.sys_cong_viec_service.editUser(this.user_model).subscribe((result) => {
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Thành công',
    //     showConfirmButton: false,
    //     timer: 2000,
    //   }).then((result) => {
    //     this.Close();
    //   });
    // });
    // console.log(this.user_model);
  }

  ngOnInit(): void {
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
