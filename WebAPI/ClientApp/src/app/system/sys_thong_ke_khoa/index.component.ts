import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
import { sys_cong_viec_service } from '../../service/sys_cong_viec.service';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import { sys_khoa_service } from '../../service/sys_khoa.service';
import { sys_bo_mon_service } from '../../service/sys_bo_mon.service';
import { sys_cong_viec_giang_vien_service } from '../../service/sys_cong_viec_giang_vien.service';
import { ExportExcelService } from '@/app/auth/export-excel.service';
import { filter_thong_ke } from '@/app/model/sys_cong_viec_giang_vien.model';
@Component({
  selector: 'sys_thong_ke_khoa_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_thong_ke_khoa_indexComponent implements OnInit {
  public lst_status: any = [];
  public lst_khoa: any = [];
  public lst_giang_vien: any = [];
  public lst_cong_viec: any = [];
  public lst_data: any = [];
  public lst_chuc_vu: any = [];
  public chartOptions: any;
  public loading: any;
  public data_excel: any;
  public filter = new filter_thong_ke();
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private sys_giang_vien_service: sys_giang_vien_service,
    private sys_cong_viec_service: sys_cong_viec_service,
    private sys_chuc_vu_service: sys_chuc_vu_service,
    private sys_khoa_service: sys_khoa_service,
    private exportExcelService: ExportExcelService,
    private sys_cong_viec_giang_vien_service: sys_cong_viec_giang_vien_service
  ) {
    this.filter.id_chuc_vu = -1;
    this.filter.id_khoa = -1;
    this.filter.id_cong_viec = '';
    this.filter.den = new Date();
    this.filter.tu = new Date();
    this.filter.tu.setDate(this.filter.den.getDate() - 7);
  }
  export_Excel(): void {
    this.sys_cong_viec_giang_vien_service
      .get_list_cong_viec_admin(this.filter)
      .subscribe((result) => {
        this.data_excel = result;

    this.exportExcelService.exportToExcelPro({
      myData: this.data_excel,
      fileName: 'DSCViecGV',
      sheetName: 'CVGV',
      report: 'CÔNG VIỆC GIẢNG VIÊN',
      myHeader: [
        'Tên giảng viên',
        'Tên công việc',
        'Tên loại công việc',
        'Số giờ',
        'Ngày bắt đầu',
        'Ngày kết thúc',
      ],
      widths: [
      ],
    });
      })
  }
  load_data(data: any): void {
    this.chartOptions = {
      title: {
        text: 'Thống kê',
      },
      theme: 'light2',
      animationEnabled: true,
      exportEnabled: true,
      axisY: {
        includeZero: true,
      },
      data: [
        {
          type: 'column', //change type to bar, line, area, pie, etc
          color: '#01b8aa',
          dataPoints: data,
        },
      ],
    };
    this.loading = true;
  }
  get_list_cong_viec(): void {
    this.sys_cong_viec_service.get_list_cong_viec().subscribe((result) => {
      this.lst_cong_viec = result;
      this.lst_cong_viec.splice(0, 0, { id: '', name: 'Tất cả' });
    });
  }
  get_thong_ke_cong_viec(): void {
    this.loading = false;
    this.sys_cong_viec_giang_vien_service
      .get_thong_ke_cong_viec_khoa(this.filter)
      .subscribe((result) => {
        this.lst_data = result;
        this.load_data(result);
      });
  }
  get_list_khoa(): void {
    this.sys_khoa_service.get_list_khoa().subscribe((data) => {
      this.lst_khoa = data;
      this.lst_khoa.splice(0, 0, { id: -1, name: 'Tất cả' });
      this.get_list_chuc_vu();
    });
  }
  get_list_chuc_vu(): void {
    this.sys_chuc_vu_service.get_list_chuc_vu().subscribe((data) => {
      this.lst_chuc_vu = data;
      this.lst_chuc_vu.splice(0, 0, { id: -1, name: 'Tất cả' });
      this.get_list_cong_viec();
    });
  }
  ngOnInit(): void {
    this.get_list_khoa();
    this.get_thong_ke_cong_viec();
  }
}
