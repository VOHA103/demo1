import { sys_cong_viec_giang_vien_service } from '../../service/sys_cong_viec_giang_vien.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { sys_cong_viec_giang_vien_popupComponent } from './popupAdd.component';
import * as XLSX from 'xlsx';
import { ExcelServicesService } from '@/app/service/ExcelService';
@Component({
  selector: 'sys_cong_viec_giang_vien_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_cong_viec_giang_vien_indexComponent implements OnInit {
  public foods: any = [];
  public listData: any = [];
  public lst_status: any = [];
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
    total: 0,
    page: 1,
    limit: 10,
    status_del: 1,
    id_giang_vien: '',
    id_cong_viec: '',
    id_chuc_vu: 0,
    id_bo_mon: 0,
    id_khoa: 0,
  };
  searchKey: string;
  constructor(
    private http: HttpClient,
    private sys_cong_viec_giang_vien_service: sys_cong_viec_giang_vien_service,
    public dialog: MatDialog,
    private excelServicesService: ExcelServicesService
  ) {}
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
  goToPrevious(): void {
    this.filter.page--;
    this.DataHanlder();
  }

  goToNext(): void {
    this.filter.page++;
    this.DataHanlder();
  }

  goToPage(n: number): void {
    this.filter.page = n;
    this.DataHanlder();
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
      console.log('The dialog was closed');
      this.DataHanlder();
    });
  }
  loadAPI() {
    this.loading = false;
    this.sys_cong_viec_giang_vien_service.getAll().subscribe((resp) => {
      this.listData = resp;
      this.loading = true;
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

  exportAsExcel(): void {
    this.excelServicesService.exportAsExcelFile(this.listData, 'CVGiangVien');
  }

  export() {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'CongViecGVienSheer');

    // save to file
    XLSX.writeFile(wb, 'CongViecGiangVien.xlsx');
  }

  DataHanlder(): void {
    debugger;
    this.loading = false;
    this.sys_cong_viec_giang_vien_service
      .DataHanlder(this.filter)
      .subscribe((resp) => {
        var model: any;
        model = resp;
        this.listData = model.data;
        this.filter.total = model.total;
        this.loading = true;
      });
  }
  ngOnInit(): void {
    this.DataHanlder();
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
