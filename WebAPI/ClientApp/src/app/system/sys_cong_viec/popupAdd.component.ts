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
import { sys_cong_viec_model } from '@/app/model/sys_cong_viec.model';
import { sys_loai_cong_viec_service } from '../../service/sys_loai_cong_viec.service';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import { sys_khoa_service } from '../../service/sys_khoa.service';
import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
@Component({
  selector: 'sys_cong_viec_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],
})
export class sys_cong_viec_popupComponent {
  public sys_cong_viec_model = new sys_cong_viec_model();
  public lst_status: any = [];
  public check_error: any = [];
  public lst_loai: any = [];
  public lst_gio: any = [];
  public lst_phut: any = [];
  public list_loai_cong_viec: any = [];
  public list_giang_vien: any;
  public lst_khoa: any = [];
  public lst_chuc_vu: any = [];
  constructor(
    private http: HttpClient,
    private sys_cong_viec_service: sys_cong_viec_service,
    private sys_loai_cong_viec_service: sys_loai_cong_viec_service,
    public dialog: MatDialog,
    private sys_giang_vien_service: sys_giang_vien_service,
    private sys_chuc_vu_service: sys_chuc_vu_service,
    private sys_khoa_service: sys_khoa_service,
    public dialogRef: MatDialogRef<sys_cong_viec_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: sys_cong_viec_model
  ) {
    //this.user = data;
    this.sys_cong_viec_model = data;
    if (this.sys_cong_viec_model.db.id == '0') this.Save();
    this.get_list_chuc_vu();
    this.get_list_khoa();
  }
  get_list_chuc_vu(): void {
    this.sys_chuc_vu_service
      .get_list_chuc_vu()
      .subscribe((data) => {
        this.lst_chuc_vu = data
        this.get_list_giang_vien();
      });
  }
  get_list_giang_vien( ): void {
    var all={"id":"-1","name":"Tất cả"}
    this.sys_giang_vien_service.get_list_giang_vien_change(this.sys_cong_viec_model.id_chuc_vu,this.sys_cong_viec_model.id_khoa).subscribe((result) => {
      this.list_giang_vien = result;
      this.list_giang_vien=this.list_giang_vien.split(0,all);
    });
  }
  get_list_khoa(): void {
    this.sys_khoa_service
      .get_list_khoa()
      .subscribe((data) => {
        this.lst_khoa = data
      });
  }
  get_list_loai_cong_viec(): void {
    debugger;
    this.sys_loai_cong_viec_service.get_list_use().subscribe((result) => {
      this.list_loai_cong_viec = result;
    });
  }
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    this.sys_cong_viec_service
      .add(this.sys_cong_viec_model)
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
    this.sys_cong_viec_service
      .edit(this.sys_cong_viec_model)
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
    this.get_list_loai_cong_viec();
    this.lst_gio = [
      {
        id: '1',
        name: '1',
      },
      {
        id: '2',
        name: '2',
      },
      {
        id: '3',
        name: '3',
      },
      {
        id: '4',
        name: '4',
      },
      {
        id: '5',
        name: '5',
      },
      {
        id: '6',
        name: '6',
      },
      {
        id: '7',
        name: '7',
      },
      {
        id: '8',
        name: '8',
      },
      {
        id: '9',
        name: '9',
      },
      {
        id: '10',
        name: '10',
      },
      {
        id: '11',
        name: '11',
      },
      {
        id: '12',
        name: '12',
      },
      {
        id: '13',
        name: '13',
      },
      {
        id: '14',
        name: '14',
      },
      {
        id: '15',
        name: '15',
      },
      {
        id: '16',
        name: '16',
      },
      {
        id: '17',
        name: '17',
      },
      {
        id: '18',
        name: '18',
      },
      {
        id: '19',
        name: '19',
      },
      {
        id: '20',
        name: '20',
      },
      {
        id: '21',
        name: '21',
      },
      {
        id: '22',
        name: '22',
      },
      {
        id: '23',
        name: '23',
      },
      {
        id: '24',
        name: '24',
      },
    ];
    this.lst_phut = [
      {
        id: '00',
        name: '00',
      },
      {
        id: '15',
        name: '15',
      },
      {
        id: '30',
        name: '30',
      },
      {
        id: '45',
        name: '45',
      },
    ];
    this.lst_loai = [
      {
        id: 1,
        name: 'Cá nhân',
      },
      {
        id: 2,
        name: 'Tập thể',
      },
    ];
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
