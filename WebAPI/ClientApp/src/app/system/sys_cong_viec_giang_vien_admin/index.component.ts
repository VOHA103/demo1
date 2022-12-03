import { sys_cong_viec_giang_vien_service } from '../../service/sys_cong_viec_giang_vien.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { ExcelServicesService } from '@/app/service/ExcelService';
import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
import { sys_cong_viec_service } from '../../service/sys_cong_viec.service';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import { sys_khoa_service } from '../../service/sys_khoa.service';
import { sys_bo_mon_service } from '../../service/sys_bo_mon.service';
import { sys_cong_viec_giang_vien_admin_popupComponent } from './popupAdd.component';
import { ExportExcelService } from '@/app/auth/export-excel.service';
import { environment } from '@/environments/environment';
@Component({
  selector: 'sys_cong_viec_giang_vien_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_cong_viec_giang_vien_admin_indexComponent implements OnInit {
  public foods: any = [];
  public listData: any = [];
  public lst_status: any = [];
  public lst_khoa: any = [];
  public lst_giang_vien: any = [];
  public lst_cong_viec: any = [];
  public lst_chuc_vu: any = [];
  public model: user_model;
  public loading = false;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  columsToDisplay = [
    'Chuc nang',
    '.No',
    'Ten giang vien',
    'Ten khoa',
    'Nhuoi tao',
    'Ngay tao',
    'Ghi chu',
  ];
  filter = {
    search: '',
    status_del: -1,
    id_giang_vien: '',
    id_cong_viec: '',
    id_chuc_vu: -1,
    id_bo_mon: 0,
    id_khoa: -1,
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
//   exportToExcel() {
//     const params = new HttpParams()
//         .set('search', this.filter.search)
//         ;

//     let uri = '/exportExcel';
//     this.http.get(uri, { params, responseType: 'blob', observe: 'response' })
//         .subscribe(resp => {
//             var res;
//             debugger
//             res = resp;
//             var downloadedFile = new Blob([res.body], { type: res.body.type });
//             const a = document.createElement('a');
//             a.setAttribute('style', 'display:none;');
//             document.body.appendChild(a);
//             a.href = URL.createObjectURL(downloadedFile);
//             a.target = '_dAblank';
//             a.download = 'DanhSachBill.xlsx'
//             a.click();
//             document.body.removeChild(a);

//         })


// }
onFileSelected(event: any) {
  this.file = event.target.files[0];
 //this.onSubmitFile();
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
      .post(this.REST_API_URL+'/sys_cong_viec_giang_vien/ImportFromExcel/', formData, {})
      .subscribe((res) => {
          console.log(res);
        if (res == '') {

          Swal.fire('Lưu thành công', '', 'success');
          this.DataHanlderAdmin();
        } else {
          Swal.fire(res.toString(), '', 'warning');
        }
      });
  }
}
// export_Excel(): void {
//     this.sys_cong_viec_giang_vien_service
//       .ExportExcel(this.filter)
//       .subscribe((resp) => {
//         var res;
//         //debugger
//         res = resp;
//         console.log(res);
//         var downloadedFile = new Blob([res.body], { type: res.body.type });
//         const a = document.createElement('a');
//         a.setAttribute('style', 'display:none;');
//         document.body.appendChild(a);
//         a.href = URL.createObjectURL(downloadedFile);
//         a.target = '_dAblank';
//         a.download = 'DanhSachBill.xlsx';
//         a.click();
//         document.body.removeChild(a);
//       });
//   }
  // let uri = this.controller + '.ctr/exportExcel';
  //       this.http.get(uri, { params, responseType: 'blob', observe: 'response' })
  //           .subscribe(resp => {
  //               var res;
  //               debugger
  //               res = resp;
  //               var downloadedFile = new Blob([res.body], { type: res.body.type });
  //               const a = document.createElement('a');
  //               a.setAttribute('style', 'display:none;');
  //               document.body.appendChild(a);
  //               a.href = URL.createObjectURL(downloadedFile);
  //               a.target = '_dAblank';
  //               a.download = 'DanhSachBill.xlsx'
  //               a.click();
  //               document.body.removeChild(a);

  // })
  pageChangeEvent(event: number) {
    this.p = event;
    this.DataHanlderAdmin();
  }
  openDialogDetail(item): void {
    const dialogRef = this.dialog.open(
      sys_cong_viec_giang_vien_admin_popupComponent,
      {
        width: '850px',
        data: item,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.DataHanlderAdmin();
    });
  }
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(
      sys_cong_viec_giang_vien_admin_popupComponent,
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
      console.log('The dialog was closed');
      this.DataHanlderAdmin();
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
        this.DataHanlderAdmin();
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
          this.DataHanlderAdmin();
        });
      });
  }
  DataHanlderAdmin(): void {
    this.loading = false;
    this.sys_cong_viec_giang_vien_service
      .DataHanlderAdmin(this.filter)
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
      .get_list_giang_vien_change(this.filter.id_chuc_vu, this.filter.id_khoa)
      .subscribe((result) => {
        this.lst_giang_vien = result;
        this.lst_giang_vien.splice(0, 0, { id: "", name: 'Tất cả' });
      });
  }
  get_list_cong_viec(): void {
    this.sys_cong_viec_service.get_list_cong_viec().subscribe((result) => {
      this.lst_cong_viec = result;
      this.lst_cong_viec.splice(0, 0, { id: "", name: 'Tất cả' });
    });
  }
  get_list_khoa(): void {
    this.sys_khoa_service.get_list_khoa().subscribe((data) => {
      this.lst_khoa = data;
      this.lst_khoa.splice(0, 0, { id: -1, name: 'Tất cả' });
    });
  }
  get_list_chuc_vu(): void {
    this.sys_chuc_vu_service.get_list_chuc_vu().subscribe((data) => {
      this.lst_chuc_vu = data;
      this.lst_chuc_vu.splice(0, 0, { id: -1, name: 'Tất cả' });
    });
  }
  ngOnInit(): void {
    this.DataHanlderAdmin();
    this.get_list_chuc_vu();
    this.get_list_khoa();
    this.get_list_cong_viec();
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
