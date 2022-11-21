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
@Component({
  selector: 'sys_thong_ke_user_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_thong_ke_user_indexComponent implements OnInit {
  public lst_status: any = [];
  public lst_khoa: any = [];
  public lst_giang_vien: any = [];
  public lst_cong_viec: any = [];
  public lst_data: any = [];
  public lst_chuc_vu: any = [];
  public chartOptions: any;
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private sys_giang_vien_service: sys_giang_vien_service,
    private sys_cong_viec_service: sys_cong_viec_service,
    private sys_chuc_vu_service: sys_chuc_vu_service,
    private sys_khoa_service: sys_khoa_service,
    private sys_cong_viec_giang_vien_service: sys_cong_viec_giang_vien_service
  ) {}
  load_data(): void {
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
          dataPoints: this.lst_data,
        },
      ],
    };
  }
  get_list_cong_viec(): void {
    this.sys_cong_viec_service.get_list_cong_viec().subscribe((result) => {
      this.lst_cong_viec = result;
    });
  }
  get_thong_ke_cong_viec_nguoi_dung(): void {
    debugger;
    this.sys_cong_viec_giang_vien_service
      .get_thong_ke_cong_viec_nguoi_dung()
      .subscribe((result) => {
        this.lst_data = result;
        console.log(this.lst_data);
        this.load_data();
      });
  }
  ngOnInit(): void {
    this.get_list_cong_viec();
    this.get_thong_ke_cong_viec_nguoi_dung();
  }
}
