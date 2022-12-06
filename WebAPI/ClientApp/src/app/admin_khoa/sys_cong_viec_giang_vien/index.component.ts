import { sys_cong_viec_giang_vien_service } from '../../service/sys_cong_viec_giang_vien.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
import { ExcelServicesService } from '@/app/service/ExcelService';
import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
import { sys_cong_viec_service } from '../../service/sys_cong_viec.service';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import { sys_khoa_service } from '../../service/sys_khoa.service';
import { sys_bo_mon_service } from '../../service/sys_bo_mon.service';
import { sys_loai_cong_viec_service } from '../../service/sys_loai_cong_viec.service';
import { sys_cong_viec_giang_vien_popupComponent } from './popupAdd.component';
import { ExportExcelService } from '@/app/auth/export-excel.service';
import { environment } from '@/environments/environment';
@Component({
  selector: 'sys_cong_viec_giang_vien_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_cong_viec_giang_vien_indexComponent implements OnInit {
  public foods: any = [];
  public listData: any = [];
  public lst_status: any = [];
  public lst_khoa: any = [];
  public lst_giang_vien: any = [];
  public lst_cong_viec: any = [];
  public lst_chuc_vu: any = [];
  public lst_bo_mon: any = [];
  public list_loai_cong_viec: any = [];
  public model: user_model;
  public loading = false;
  filter = {
    search: '',
    id_giang_vien: '',
    id_cong_viec: '',
    id_bo_mon: -1,
    status_del: -1,
    id_loai_cong_viec: -1,
  };
  private REST_API_URL = environment.api;
  public file: any;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  search: string = '';
  p: number = 0;
  total: number = 100;
  resp: number;
  constructor(
    private http: HttpClient,
    private sys_loai_cong_viec_service: sys_loai_cong_viec_service,
    private sys_giang_vien_service: sys_giang_vien_service,
    private sys_cong_viec_service: sys_cong_viec_service,
    private sys_chuc_vu_service: sys_chuc_vu_service,
    private sys_khoa_service: sys_khoa_service,
    private sys_bo_mon_service: sys_bo_mon_service,
    private sys_cong_viec_giang_vien_service: sys_cong_viec_giang_vien_service,
    public dialog: MatDialog,
    private excelServicesService: ExcelServicesService,
    private exportExcelService: ExportExcelService
  ) {}
  get_list_bo_mon(): void {
    this.sys_bo_mon_service.get_list_bo_mon().subscribe((data) => {
      this.lst_bo_mon = data;
      this.lst_bo_mon.splice(0, 0, { id: -1, name: 'Tất cả' });
      this.get_list_giang_vien();
    });
  }
  get_list_loai_cong_viec(): void {
    this.sys_loai_cong_viec_service.get_list_use().subscribe((result) => {
      this.list_loai_cong_viec = result;
      this.list_loai_cong_viec.splice(0, 0, { id: -1, name: 'Tất cả' });
    });
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    event.target.value = null;
  }
  dowloadFileMau() {
    // var url = '/sys_user.ctr/downloadtemp';
    // window.location.href = url;
  }
  onSubmitFile() {
    if (this.file == null || this.file == undefined) {
      Swal.fire('Phải chọn file import', '', 'warning');
    } else {
      var formData = new FormData();
      formData.append('file', this.file);
      this.http
        .post(
          this.REST_API_URL + '/sys_cong_viec_giang_vien/ImportFromExcel/',
          formData,
          {}
        )
        .subscribe((res) => {
          console.log(res);
          if (res == '') {
            Swal.fire('Lưu thành công', '', 'success');
            this.DataHanlder();
          } else {
            Swal.fire(res.toString(), '', 'warning');
          }
        });
    }
  }
  pageChangeEvent(event: number) {
    this.p = event;
    this.DataHanlder();
  }
  openDialogDetail(item): void {
    const dialogRef = this.dialog.open(
      sys_cong_viec_giang_vien_popupComponent,
      {
        width: '850px',
        data: item,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.DataHanlder();
    });
  }
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(
      sys_cong_viec_giang_vien_popupComponent,
      {
        width: '850px',
        data: {
          db: {
            id: '0',
          },
          list_giang_vien: null,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.DataHanlder();
    });
  }

  export_Excel(): void {
    const exportData = this.listData.map((data) => {
      return {
        ten_giang_vien: data.ten_giang_vien,
        ten_cong_viec: data.ten_cong_viec,
        status_del: data.db.status_del,
        create_name: data.create_name,
        create_date: data.db.create_date,
        note: data.db.note,
      };
    });
    this.exportExcelService.exportToExcelPro({
      myData: exportData,
      fileName: 'DSCViecGV',
      sheetName: 'CVGV',
      report: 'CÔNG VIỆC GIẢNG VIÊN',
      myHeader: [
        'Tên giảng viên',
        'Công việc',
        'Trạng thái',
        'Người tạo',
        'Ngày tạo',
        'Ghi chú',
      ],
      widths: [
        { width: 30 },
        { width: 25 },
        { width: 25 },
        { width: 35 },
        { width: 40 },
      ],
    });
  }
  delete(id): void {
    this.sys_cong_viec_giang_vien_service.delete(id).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        this.DataHanlder();
      });
    });
  }
  reven_status(id): void {
    this.sys_cong_viec_giang_vien_service
      .reven_status(id)
      .subscribe((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          this.DataHanlder();
        });
      });
  }
  DataHanlder(): void {
    this.loading = false;
    this.sys_cong_viec_giang_vien_service
      .DataHanlder(this.filter)
      .subscribe((resp) => {
        var model: any;
        this.listData = resp;
        this.total = this.resp;
        model = resp;
        this.listData = model.data;
        this.total = model.total;
        this.loading = true;
        this.pageIndex = model.pageIndex;
        this.pageSize = model.pageSize;
        this.totalRow = model.totalRow;
      });
  }

  get_list_giang_vien(): void {
    this.sys_giang_vien_service
      .get_list_giang_vien_bo_mon(this.filter.id_bo_mon)
      .subscribe((result) => {
        this.lst_giang_vien = result;
        this.lst_giang_vien.splice(0, 0, {
          id: '',
          name: 'Tất cả',
        });
        this.DataHanlder();
      });
  }
  get_list_cong_viec(): void {
    this.sys_cong_viec_service.change_cong_viec_khoa().subscribe((result) => {
      this.lst_cong_viec = result;
      this.lst_cong_viec.splice(0, 0, { id: '', name: 'Tất cả' });
    });
  }
  ngOnInit(): void {
    this.DataHanlder();
    this.get_list_cong_viec();
    this.get_list_bo_mon();
    this.get_list_loai_cong_viec();
    this.lst_status = [
      {
        id: -1,
        name: 'Tất cả',
      },
      {
        id: 1,
        name: 'Hoàn thành',
      },
      {
        id: 2,
        name: 'Chưa hoàn thành',
      },
      {
        id: 3,
        name: 'Đang thực hiện',
      },
    ];
  }
}
