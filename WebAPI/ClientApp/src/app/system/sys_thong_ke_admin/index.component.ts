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
  selector: 'sys_thong_ke_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_thong_ke_indexComponent implements OnInit {
  public lst_status: any = [];
  public lst_khoa: any = [];
  public lst_giang_vien: any = [];
  public lst_cong_viec: any = [];
  public lst_data: any = [];
  public lst_chuc_vu: any = [];
  public chartOptions: any;
  public loading: any;
  filter = {
    id_cong_viec: '',
    id_chuc_vu: '',
    id_khoa: '',
  };
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private sys_giang_vien_service: sys_giang_vien_service,
    private sys_cong_viec_service: sys_cong_viec_service,
    private sys_chuc_vu_service: sys_chuc_vu_service,
    private sys_khoa_service: sys_khoa_service,
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
  get_list_cong_viec(): void {
    this.sys_cong_viec_service.get_list_cong_viec().subscribe((result) => {
      this.lst_cong_viec = result;
    });
  }
  get_thong_ke_cong_viec(): void {
    this.loading=false;
    this.sys_cong_viec_giang_vien_service
      .get_thong_ke_cong_viec(this.filter)
      .subscribe((result) => {
        this.lst_data = result;
        this.load_data(result);
      });
  }
  get_list_khoa(): void {
    this.sys_khoa_service.get_list_khoa().subscribe((data) => {
      this.lst_khoa = data;
      this.get_list_chuc_vu();
    });
  }
  get_list_chuc_vu(): void {
    this.sys_chuc_vu_service.get_list_chuc_vu().subscribe((data) => {
      this.lst_chuc_vu = data;
      this.get_list_cong_viec();
    });
  }
  ngOnInit(): void {
    this.get_list_khoa();
  }
}
