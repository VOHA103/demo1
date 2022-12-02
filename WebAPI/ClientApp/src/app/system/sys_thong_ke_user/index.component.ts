import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { sys_cong_viec_giang_vien_service } from '../../service/sys_cong_viec_giang_vien.service';
import { sys_loai_cong_viec_service } from '../../service/sys_loai_cong_viec.service';
import { ExportExcelService } from '@/app/auth/export-excel.service';
import { filter_thong_ke_user } from '@/app/model/sys_cong_viec_giang_vien.model';
@Component({
  selector: 'sys_thong_ke_user_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_thong_ke_user_indexComponent implements OnInit {
  public lst_loai_cong_viec: any = [];
  public lst_data: any = [];
  public loading: any;
 public filter =new filter_thong_ke_user()
  public chartOptions: any;
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,

    private exportExcelService: ExportExcelService,
    private sys_loai_cong_viec_service: sys_loai_cong_viec_service,
    private sys_cong_viec_giang_vien_service: sys_cong_viec_giang_vien_service
  ) {
    this.filter.id_loai_cong_viec = -1;
    this.filter.den = new Date();
    this.filter.tu = new Date();
    this.filter.tu.setDate(this.filter.den.getDate()-7);
    console.log(this.filter.den);
    console.log(this.filter.tu);

  }
  export_Excel(): void {
     const exportData =""
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
  load_data(data:any): void {
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
    this.loading=true;
  }
  get_list_loai_cong_viec(): void {
    this.sys_loai_cong_viec_service.get_list_use().subscribe((result) => {
      this.lst_loai_cong_viec = result;
      this.lst_loai_cong_viec.splice(0,0,{id:-1,name:"Tất cả"})
    });
  }
  get_thong_ke_cong_viec_nguoi_dung(): void {
    this.loading = false;
    this.sys_cong_viec_giang_vien_service
      .get_thong_ke_cong_viec_nguoi_dung(this.filter)
      .subscribe((result) => {
        this.lst_data = result;
        this.load_data(result);
      });
  }
  ngOnInit(): void {
    this.get_list_loai_cong_viec();
    this.get_thong_ke_cong_viec_nguoi_dung();
  }
}
