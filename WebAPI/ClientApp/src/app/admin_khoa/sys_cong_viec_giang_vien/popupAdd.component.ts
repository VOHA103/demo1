import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sys_cong_viec_giang_vien_service } from '../../service/sys_cong_viec_giang_vien.service';
import { sys_cong_viec_service } from '../../service/sys_cong_viec.service';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import { sys_khoa_service } from '../../service/sys_khoa.service';
import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
import { sys_bo_mon_service } from '../../service/sys_bo_mon.service';
import Swal from 'sweetalert2';
import { sys_cong_viec_giang_vien_model } from '@/app/model/sys_cong_viec_giang_vien.model';
@Component({
  selector: 'sys_cong_viec_giang_vien_popup',
  templateUrl: './popupAdd.component.html',
  styleUrls: ['./popupAdd.component.scss'],
})
export class sys_cong_viec_giang_vien_popupComponent {
  public record = new sys_cong_viec_giang_vien_model();
  public lst_status: any = [];
  public list_cong_viec: any;
  public check_error: any = [];
  public list_giang_vien: any;
  public lst_khoa: any = [];
  public lst_chuc_vu: any = [];
  public lst_bo_mon: any = [];
  public lst_phut: any = [];
  public lst_gio: any = [];
  public list_option: any = [];
  public action: any;
  constructor(
    private http: HttpClient,
    private sys_cong_viec_giang_vien_service: sys_cong_viec_giang_vien_service,
    private sys_giang_vien_service: sys_giang_vien_service,
    private sys_cong_viec_service: sys_cong_viec_service,
    private sys_chuc_vu_service: sys_chuc_vu_service,
    private sys_khoa_service: sys_khoa_service,
    private sys_bo_mon_service: sys_bo_mon_service,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<sys_cong_viec_giang_vien_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.record = data;
    if (this.record.db.id == '0') this.Save();
    this.get_list_bo_mon();
  }
  Close(): void {
    this.dialogRef.close();
  }
  Save(): void {
    this.sys_cong_viec_giang_vien_service
      .add(this.record)
      .subscribe((result) => {
        var data: any = result;
        this.check_error = data.error;
        if (this.check_error.length === 0) {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            showConfirmButton: false,
            timer: 2000,
          }).then((result) => {
            this.Close();
          });
        }
      });
  }
  Edit(): void {
    this.sys_cong_viec_giang_vien_service
      .edit(this.record)
      .subscribe((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          showConfirmButton: false,
          timer: 2000,
        }).then((result) => {
          this.Close();
        });
      });
  }
  get_list_giang_vien(): void {
    this.sys_giang_vien_service
      .get_list_giang_vien_bo_mon(this.record.db.id_bo_mon)
      .subscribe((result) => {
        if (this.record.db.id_bo_mon != -1) this.list_giang_vien = result;
        this.list_giang_vien = this.list_giang_vien.split(0, 0, {
          id: '-1',
          name: 'Tất cả',
        });
      });
  }
  // get_list_cong_viec(): void {
  //   this.sys_cong_viec_service.get_list_cong_viec().subscribe((result) => {
  //     this.list_cong_viec = result;
  //   });
  // }
  get_list_cong_viec(): void {
    this.sys_cong_viec_service.change_cong_viec_khoa().subscribe((result) => {
      this.list_cong_viec = result;
    });
  }
  get_list_bo_mon(): void {
    this.sys_bo_mon_service.get_list_bo_mon().subscribe((data) => {
      this.lst_bo_mon = data;
      this.lst_bo_mon = this.lst_bo_mon.split(0, 0, {
        id: -1,
        name: 'Tất cả',
      });
      this.record.db.id_bo_mon = -1;
    });
  }
  ngOnInit(): void {
    this.get_list_cong_viec();
    this.list_option = [
      {
        id: -1,
        name: 'Tất cả',
      },
      {
        id: 1,
        name: 'Chọn',
      },
    ];
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
