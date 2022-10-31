import { sys_khoa_model } from '../../model/sys_khoa.model';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { sys_khoa_service } from '../../service/sys_khoa.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class sys_khoa_popupComponent {
  public record=new sys_khoa_model();
  public lst_status: any = [];
  constructor(
    private http: HttpClient,
    private sys_khoa_service: sys_khoa_service,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<sys_khoa_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_khoa_model
  ) {}
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    this.sys_khoa_service.add(this.record).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 2000
      }).then((result) => {
      this.Close();
      })
    });
    console.log(this.record);
  }
  Edit(): void {
    this.sys_khoa_service.edit(this.record).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 2000
      }).then((result) => {
      this.Close();
      })
    });
    console.log(this.record);
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
