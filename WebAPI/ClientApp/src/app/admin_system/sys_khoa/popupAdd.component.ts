import { user_model } from '../../model/user.model';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_khoa_service } from '../../service/sys_khoa.service';
import { sys_user_service } from '../../service/sys_user.service';
import Swal from 'sweetalert2';
import { sys_khoa_model } from '../../model/sys_khoa.model';
@Component({
  selector: 'sys_khoa_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],
})
export class sys_khoa_popupComponent {
  public sys_khoa_model = new sys_khoa_model();
  public lst_status: any = [];
  public check_error: any = [];
  public id_user: any;
  constructor(
    private http: HttpClient,
    private sys_khoa_service: sys_khoa_service,
    public dialog: MatDialog,
    private sys_user_service: sys_user_service,
    public dialogRef: MatDialogRef<sys_khoa_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_khoa_model
  ) {
    this.sys_khoa_model = data;
    this.get_profile_user();
  }

  public get_profile_user():void{
    this.sys_user_service.get_profile_user().subscribe(
      (res:any) => {
        this.id_user = res.id;
        debugger
        if (this.sys_khoa_model.db.id == 0){
          this.Save();
          this.sys_khoa_model.db.create_by=this.id_user;
        } else {
          this.sys_khoa_model.db.update_by=this.id_user;
        }
      },
      err => {
        console.log(err);
      },
    );
  }
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    this.sys_khoa_service.add(this.sys_khoa_model).subscribe((result) => {
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
    this.sys_khoa_service.edit(this.sys_khoa_model).subscribe((result) => {
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
        name: 'Thành viên',
      },
      {
        id: '2',
        name: 'Công việc',
      },
    ];
  }
}
