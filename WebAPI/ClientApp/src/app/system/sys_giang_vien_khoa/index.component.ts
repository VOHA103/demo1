import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { sys_giang_vien_khoa_popupComponent } from './popupAdd.component';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import { sys_khoa_service } from '../../service/sys_khoa.service';
import * as XLSX from 'xlsx';
import { environment } from '@/environments/environment';
@Component({
  selector: 'sys_giang_vien_khoa_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_giang_vien_khoa_indexComponent implements OnInit {
  public foods: any = [];
  public file: any;
  public listData: any = [];
  public lst_status: any = [];
  public model: user_model;
  public loading = false;
  public lst_khoa: any = [];
  public lst_chuc_vu: any = [];

  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  search: string = '';
  p: number = 0;
  total: number = 100;
  resp: number;
  page = 1;
  limit = 10;
  filter = {
    search: '',
    status_del: '1',
    id_chuc_vu: -1,
    id_khoa: -1,
    id_chuyen_nghanh: -1,
  };
  searchKey: string;
  data: any;

  private REST_API_URL = environment.api;
  constructor(
    private http: HttpClient,
    private sys_chuc_vu_service: sys_chuc_vu_service,
    private sys_khoa_service: sys_khoa_service,
    private sys_giang_vien_service: sys_giang_vien_service,
    public dialog: MatDialog
  ) {
    this.DataHanlderKhoa();
    this.get_list_khoa();
    this.get_list_chuc_vu();
  }
  export_Excel(){}
  submit_file(event: any) {
    debugger
    let file = event.target.files[0];

    let fileReader = new FileReader();

    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workbook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workbook.SheetNames;

      this.data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
      console.log(this.data);
    };
  }
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
        .post(this.REST_API_URL+'/sys_giang_vien/ImportFromExcel/', formData, {})
        .subscribe((res) => {
            console.log(res);
          if (res == '') {

            Swal.fire('Lưu thành công', '', 'success');
            this.DataHanlderKhoa();
          } else {
            Swal.fire(res.toString(), '', 'warning');
          }
        });
    }
  }
  pageChangeEvent(event: number) {
    this.p = event;
    this.DataHanlderKhoa();
  }
  get_list_khoa(): void {
    this.sys_khoa_service.get_list_khoa().subscribe((data) => {
      var result: any;
      result = data;
      this.lst_khoa = result;
      this.lst_khoa.splice(0, 0, { id: -1, name: 'Tất cả' });
    });
  }
  get_list_chuc_vu(): void {
    this.sys_chuc_vu_service.get_list_chuc_vu().subscribe((data) => {
      var result: any;
      result = data;
      this.lst_chuc_vu = result;
      this.lst_chuc_vu.splice(0, 0, { id: -1, name: 'Tất cả' });
    });
  }
  DataHanlderKhoa(): void {
    // debugger;
     this.loading = false;
    this.sys_giang_vien_service.DataHanlderKhoa(this.filter).subscribe((resp) => {
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
  openDialogDetail(item): void {
    debugger;
    const dialogRef = this.dialog.open(sys_giang_vien_khoa_popupComponent, {
      width: '850px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.DataHanlderKhoa();
    });
  }
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(sys_giang_vien_khoa_popupComponent, {
      width: '850px',
      data: {
        db: {
          id: '0',
        },
        list_bo_mon: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.DataHanlderKhoa();
    });
  }
  delete(id): void {
    this.sys_giang_vien_service.delete(id).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
        this.DataHanlderKhoa();
      });
    });
  }
  reset_password(id): void {
    this.sys_giang_vien_service.reset_password(id).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
        this.DataHanlderKhoa();
      });
    });
  }
  reven_status(id): void {
    this.sys_giang_vien_service.reven_status(id).subscribe((result) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
        this.DataHanlderKhoa();
      });
    });
  }
  ngOnInit(): void {
    this.DataHanlderKhoa();
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
