import { sys_user_service } from '../../service/sys_user.service';
import { sys_cau_hinh_admin_service } from '../../service/sys_cau_hinh_admin.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'nav_index',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class nav_indexComponent implements OnInit {
  public menu_sub_admin: any = [];
  public menu_admin: any = [];
  public menu_user: any = [];
  public menu_admin_bo_mon: any = [];
  public menu: any = [];
  opened = false;
  public loading = false;
  panelOpenState = false;
  public currentYear: Date;
  public profile: any;
  public id_user: any;
  public cau_hinh: any;

  @ViewChild('sidenav') sidenav: MatSidenav;
  public isOpened = false;
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
  public openLeftSide() {
    this.isOpened = !this.isOpened;
    this.sidenav.toggle();
  }

  public closeLeftSide() {
    this.isOpened = false;
  }
  show_hide() {
    if (this.opened == false) this.opened = true;
    else this.opened = false;
  }
  public get_cau_hinh_admin() {
    this.sys_cau_hinh_admin_service.get_cau_hinh_admin().subscribe((data) => {
      this.cau_hinh = data;
      this.get_profile_user();
    });
  }
  public get_profile_user(): void {
    this.sys_user_service.get_profile_user().subscribe((res: any) => {
      this.profile = res;
      this.load_role();
      this.loading = true;
    });
  }
  load_role() {
    this.menu_admin = [
      {
        link: 'sys_thong_ke_index',
        label: 'Thống kê',
      },
      // {
      //   link: 'sys_cong_viec_giang_vien_admin_index',
      //   label: 'Công việc giảng viên',
      // },
      {
        link: 'sys_giang_vien_index',
        label: 'Giảng viên',
      },
      {
        link: 'sys_chuc_vu_index',
        label: 'Chức vụ',
      },
      {
        link: 'sys_khoa_index',
        label: 'Khoa',
      },
    ];
    this.menu_sub_admin = [
      {
        link: 'sys_thong_ke_khoa_index',
        label: 'Thống kê',
      },
      {
        link: 'sys_giang_vien_khoa_index',
        label: 'Giảng viên',
      },
      {
        link: 'sys_bo_mon_index',
        label: 'Bộ môn',
      },
      {
        link: 'sys_chuyen_nganh_index',
        label: 'Chuyên nghành',
      },
      {
        link: 'sys_cong_viec_giang_vien_index',
        label: 'Công việc giảng viên',
      },
      {
        link: 'sys_cong_viec_index',
        label: 'Công việc',
      },
      {
        link: 'sys_loai_cong_viec_index',
        label: 'Loại công việc',
      },
      // {
      //   link: 'sys_phong_truc_index',
      //   label: 'Phòng trực',
      // },
      // {
      //   link: 'sys_ky_truc_khoa_index',
      //   label: 'Kỳ trực khoa',
      // },
    ];
    this.menu_user = [
      {
        link: 'sys_person_work_index',
        label: 'Công việc người dùng',
      },
      {
        link: 'sys_thong_ke_user_index',
        label: 'Thống kê người dùng',
      },
      // {
      //   link: 'sys_cau_hinh_admin_index',
      //   label: 'Cấu hình admin',
      // },
    ];
    this.menu_admin_bo_mon = [
      {
        link: 'sys_thong_ke_bo_mon_index',
        label: 'Thống kê bộ môn',
      },
      {
        link: 'sys_giang_vien_khoa_bo_mon_index',
        label: 'Giảng viên',
      },
      {
        link: 'sys_cong_viec_giang_vien_admin_bo_mon_index',
        label: 'Công việc giảng viên',
      },
      {
        link: 'sys_person_work_index',
        label: 'Công việc người dùng',
      },
      {
        link: 'sys_thong_ke_user_index',
        label: 'Thống kê người dùng',
      },
    ];
    if (this.profile.code === 'admin') this.menu = this.menu_admin;
    if (this.profile.code === 'sub_admin') this.menu = this.menu_sub_admin;
    if (this.profile.code === 'admin_bo_mon')  this.menu = this.menu_admin_bo_mon;
    if (this.profile.code === 'user') this.menu = this.menu_user;




    if(this.profile.code=="admin" && this.profile.name=="administrator")
    this.menu=[
      {
        link: 'sys_giang_vien_khoa_index',
        label: 'Giảng viên khoa',
      },
      {
        link: 'sys_thong_ke_index',
        label: 'Thống kê',
      },
      {
        link: 'sys_chuc_vu_index',
        label: 'Chức vụ',
      },
      {
        link: 'sys_khoa_index',
        label: 'Khoa',
      },
      {
        link: 'sys_bo_mon_index',
        label: 'Bộ môn',
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
        link: 'sys_cong_viec_giang_vien_index',
        label: 'Công việc giảng viên',
      },
      {
        link: 'sys_cong_viec_index',
        label: 'Công việc',
      },
      {
        link: 'sys_giang_vien_index',
        label: 'Giảng viên',
      },
      {
        link: 'sys_loai_cong_viec_index',
        label: 'Loại công việc',
      },
      {
        link: 'sys_phong_truc_index',
        label: 'Phòng trực',
      },
    ]
  }
  role_admin: any;
  ngOnInit(): void {
    this.get_cau_hinh_admin();
  }
}
