import { sys_user_service } from '../../service/sys_user.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Router } from '@angular/router';
@Component({
  selector: "nav_index",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class nav_indexComponent implements OnInit {
public menu:any=[];
opened=false;
public currentYear:Date;
public userDetails:any;
public id_user:any;
anio: number = new Date().getFullYear();
  constructor(private router: Router,private http: HttpClient, private sys_user_service:sys_user_service, public dialog: MatDialog) {

this.currentYear=new Date("YYYY");
  }
  show_hide(){
    debugger
    if(this.opened==false)
    this.opened=true;
    else
    this.opened=false;
  }
public get_profile_user():void{
  this.sys_user_service.get_profile_user().subscribe(
    (res:any) => {
      this.userDetails = res;
    },
    err => {
      console.log(err);
    },
  );
}
public get_id_user():void{
  this.sys_user_service.get_id_user().subscribe(
    (res:any) => {
      this.id_user = res;
    },
    err => {
      console.log(err);
    },
  );
}
  ngOnInit(): void {
    this.get_profile_user();
    this.get_id_user();
    console.log(localStorage.getItem('token'));

this.menu=[
  {
    link:"sys_user_index",
    label:"Thành viên"
  },
  {
    link:"sys_khoa_index",
    label:"Khoa"
  },
  {
    link:"sys_bo_mon_index",
    label:"Bộ môn"
  },
  {
    link:"sys_bo_mon_giang_vien_index",
    label:"Bộ môn giảng viên"
  },
  {
    link:"sys_chuc_vu_index",
    label:"Chức vụ"
  },
  {
    link:"sys_cong_viec_giang_vien_index",
    label:"Công việc giảng viên"
  },
  {
    link:"sys_cong_viec_index",
    label:"Công việc"
  },
  {
    link:"sys_giang_vien_index",
    label:"Giảng viên"
  },
  {
    link:"sys_giang_vien_truc_khoa_index",
    label:"Giảng viên trực khoa"
  },
  {
    link:"sys_hoat_dong_index",
    label:"Hoạt động"
  },
  {
    link:"sys_hoat_dong_giang_vien_index",
    label:"Hoạt động giảng viên"
  },
  {
    link:"sys_loai_cong_viec_index",
    label:"Loại công việc"
  },
  {
    link:"sys_phong_truc_index",
    label:"Phòng trực"
  },
  {
    link:"sys_thong_bao_index",
    label:"Thông báo"
  },

]
  }
}
