import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { sys_cong_viec_giang_vien_service } from '../../service/sys_cong_viec_giang_vien.service';
import { sys_loai_cong_viec_service } from '../../service/sys_loai_cong_viec.service';
@Component({
  selector: 'sys_thong_ke_user_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_thong_ke_user_indexComponent implements OnInit {
  public lst_loai_cong_viec: any = [];
  public lst_data: any = [];
  public loading: any;
  filter = {
    id_loai_cong_viec: -1,
  };
  public chartOptions: any;
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private sys_loai_cong_viec_service: sys_loai_cong_viec_service,
    private sys_cong_viec_giang_vien_service: sys_cong_viec_giang_vien_service
  ) {}
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
