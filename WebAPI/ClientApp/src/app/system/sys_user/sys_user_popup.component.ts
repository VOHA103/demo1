import { user_model } from './../../model/user.model';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_user_service } from './../../service/sys_user.service';
import Swal from 'sweetalert2'
import { User } from '@/app/database/user.data';
@Component({
  selector: 'sys_user_popup',
  templateUrl: './sys_user_popup.component.html',
  styleUrls: ['./sys_user_popup.component.scss'],
})
export class sys_user_popupComponent {
  public user=new User();
  public user_model=new user_model();
  public lst_status: any = [];
  constructor(
    private http: HttpClient,
    private sys_user_service: sys_user_service,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<sys_user_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: user_model
  ) {
    //this.user = data;
    this.user_model = data;

  }
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    this.sys_user_service.addUser(this.user_model).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 2000
      }).then((result) => {
      this.Close();
      })
    });
    console.log(this.user_model);
  }
  Edit(): void {
    this.sys_user_service.editUser(this.user_model).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 2000
      }).then((result) => {
      this.Close();
      })
    });
    console.log(this.user_model);
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
