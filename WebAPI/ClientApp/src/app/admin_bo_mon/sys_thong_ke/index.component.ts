import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { sys_cong_viec_giang_vien_service } from '../../service/sys_cong_viec_giang_vien.service';
import { sys_loai_cong_viec_service } from '../../service/sys_loai_cong_viec.service';
import { ExportExcelService } from '@/app/auth/export-excel.service';
import { filter_thong_ke_user } from '@/app/model/sys_cong_viec_giang_vien.model';
@Component({
  selector: 'sys_thong_ke_bo_mon_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_thong_ke_bo_mon_indexComponent implements OnInit {
  public lst_loai_cong_viec: any = [];
  public lst_data: any = [];
  public listData: any = [];
  public loading: any;
  public filter = new filter_thong_ke_user();
  public chartOptions: any;
  public data_excel: any;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public totalRow: number;
  total: number = 100;
  time_done: any;
  time_pending: any;
  time_wait: any;
  time_done_pie: any;
  time_pending_pie: any;
  time_wait_pie: any;
  total_time: any;
  constructor(
    public dialog: MatDialog,
    private exportExcelService: ExportExcelService,
    private sys_loai_cong_viec_service: sys_loai_cong_viec_service,
    private sys_cong_viec_giang_vien_service: sys_cong_viec_giang_vien_service
  ) {
    this.filter.id_loai_cong_viec = -1;
    this.filter.den = new Date();
    this.filter.tu = new Date();
    this.filter.tu.setDate(this.filter.den.getDate() - 7);
    // this.get_list_loai_cong_viec();
    // this.get_thong_ke_cong_viec_nguoi_dung();
    this.DataHanlder();
  }
  set_value_pie() {
    debugger;
    this.chartOptions = {
      animationEnabled: true,
      // title: {
      //   text: "Sales by Department"
      // },
      data: [
        {
          type: 'pie',
          indexLabel: '{name}: {y}',
          yValueFormatString: "#,###.##'%'",
          dataPoints: [
            {
              y: this.time_done_pie,
              name: '???? ho??n thanh',
            },
            {
              y: this.time_wait_pie,
              name: 'Ch??a th???c hi???n',
            },
            {
              y: this.time_pending_pie,
              name: '??ang th???c hi???n',
            },
          ],
        },
      ],
    };
    this.loading = true;
  }
  export_Excel(): void {
    this.sys_cong_viec_giang_vien_service
      .get_list_cong_viec_nguoi_dung(this.filter)
      .subscribe((result) => {
        this.data_excel = result;
        this.exportExcelService.exportToExcelPro({
          myData: this.data_excel,
          fileName: 'DSCViecGV',
          sheetName: 'CVGV',
          report: 'C??NG VI???C GI???NG VI??N',
          myHeader: [
            'T??n c??ng vi???c',
            'T??n lo???i c??ng vi???c',
            'S??? gi???',
            'Ng??y b???t ?????u',
            'Ng??y k???t th??c',
          ],
          widths: [
            { width: 30 },
            { width: 25 },
            { width: 25 },
            { width: 35 },
            { width: 40 },
          ],
        });
      });
  }
  DataHanlder(): void {
    this.loading = false;
    this.sys_cong_viec_giang_vien_service
      .DataHanlderGiangVien(this.filter)
      .subscribe((resp) => {
        var model: any;
        model = resp;
        this.listData = model.result;
        this.total_time =
          model.time_wait + model.time_wait + model.time_pending;
        this.time_done = model.time_done;
        this.time_pending = model.time_pending;
        this.time_wait = model.time_wait;
        debugger
        var total = model.time_wait + model.time_pending + model.time_done;
        this.time_done_pie = Math.round( (model.time_done / total) * 100);
        this.time_pending_pie = Math.round((model.time_pending / total) * 100);
        this.time_wait_pie = Math.round((model.time_wait / total) * 100);
        this.set_value_pie();
      });
  }
  ngOnInit(): void {
    this.DataHanlder();
  }
}
