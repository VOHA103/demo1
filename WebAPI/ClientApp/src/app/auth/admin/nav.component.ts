import { sys_user_service } from '../../service/sys_user.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '@/app/database/user.data';
import { Router } from '@angular/router';
@Component({
  selector: "nav_index",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class nav_indexComponent implements OnInit {
public menu:any=[];
public currentYear:Date;
public userDetails:any;
public id_user:any;
anio: number = new Date().getFullYear();
  constructor(private router: Router,private http: HttpClient, private sys_user_service:sys_user_service, public dialog: MatDialog) {

this.currentYear=new Date("YYYY");
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
onLogout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
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
    link:"sys_user_index1",
    label:"Công việc"
  },
  {
    link:"sys_khoa_index",
    label:"Khoa"
  },
  {
    link:"login",
    label:"Bộ môn"
  },

]
  }
}
