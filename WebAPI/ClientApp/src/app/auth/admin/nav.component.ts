import { sys_user_service } from '../../service/sys_user.service';
import { sys_cau_hinh_admin_service } from '../../service/sys_cau_hinh_admin.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'nav_index',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class nav_indexComponent implements OnInit {
  public menu: any = [];
  opened = false;
  panelOpenState = false;
  public currentYear: Date;
  public profile: any;
  public id_user: any;
  public cau_hinh: any;
  anio: number = new Date().getFullYear();
  constructor(
    private router: Router,
    private http: HttpClient,
    private sys_user_service: sys_user_service,
    private sys_cau_hinh_admin_service: sys_cau_hinh_admin_service,
    public dialog: MatDialog
  ) {
    this.currentYear = new Date('YYYY');
  }
  show_hide() {
    debugger;
    if (this.opened == false) this.opened = true;
    else this.opened = false;
  }
  public get_cau_hinh_admin(){
this.sys_cau_hinh_admin_service.get_cau_hinh_admin().subscribe(data=>{
this.cau_hinh=data;
});
  }
  public get_profile_user(): void {
    this.sys_user_service.get_profile_user().subscribe(
      (res: any) => {
        this.profile = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  public get_id_user(): void {
    this.sys_user_service.get_id_user().subscribe(
      (res: any) => {
        this.id_user = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    console.log(localStorage.getItem('token'));
    this.get_profile_user();
    this.get_id_user();
    this.get_cau_hinh_admin();

    this.menu = [
      {
        link: 'sys_cau_hinh_giao_dien_index',
        label: 'Cấu hình giao diện',
      },
      {
        link: 'sys_bo_mon_index',
        label: 'Bộ môn',
      },
      // {
      //   link:"sys_user_index",
      //   label:"Thành viên"
      // },
      {
        link: 'sys_khoa_index',
        label: 'Khoa',
      },
      {
        link: 'sys_chuyen_nganh_index',
        label: 'Chuyên nghành',
      },
      {
        link: 'sys_ky_truc_khoa_index',
        label: 'Kỳ trực khoa',
      },
      {
        link: 'sys_chuc_vu_index',
        label: 'Chức vụ',
      },
      {
        link:"sys_cong_viec_giang_vien_index",
        label:"Công việc giảng viên"
      },
      {
        link: 'sys_cong_viec_index',
        label: 'Công việc',
      },
      {
        link: 'sys_giang_vien_index',
        label: 'Giảng viên',
      },
      // {
      //   link:"sys_giang_vien_truc_khoa_index",
      //   label:"Giảng viên trực khoa"
      // },
      {
        link: 'sys_hoat_dong_index',
        label: 'Hoạt động',
      },
      // {
      //   link: 'sys_hoat_dong_giang_vien_index',
      //   label: 'Hoạt động giảng viên',
      // },
      {
        link: 'sys_loai_cong_viec_index',
        label: 'Loại công việc',
      },
      {
        link: 'sys_phong_truc_index',
        label: 'Phòng trực',
      },
      // {
      //   link: 'sys_thong_bao_index',
      //   label: 'Thông báo',
      // },
    ];
  }
}
