import { sys_user_service } from './../../service/sys_user.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_user_popupComponent } from './sys_user_popup.component';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'sys_user_index',
  templateUrl: './sys_user.component.html',
  styleUrls: ['./sys_user.component.scss'],
})
export class sys_user_indexComponent implements OnInit {
  public foods: any = [];
  public listData: any = [];
  public model: user_model;
  constructor(
    private http: HttpClient,
    private sys_user_service: sys_user_service,
    public dialog: MatDialog
  ) {}
  openDialogDetail(item): void {
    const dialogRef = this.dialog.open(sys_user_popupComponent, {
      width: '850px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadAPI();
    });
  }
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(sys_user_popupComponent, {
      width: '850px',
      data: {
        db: {
          id: '0',
        },
        lst_cong_viec: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.loadAPI();
    });
  }
  loadAPI() {
    this.sys_user_service.getAll().subscribe((data) => {
      this.listData = data;
      console.log(this.listData);
    });
  }
  delete(id): void {
    this.sys_user_service.deleteUser(id).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
        this.loadAPI();
      });
    });
  }
  ngOnInit(): void {
    this.loadAPI();
  }
}
