import { sys_user_service } from '../../service/sys_user.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '@/app/database/user.data';
@Component({
  selector: "nav_index",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class nav_indexComponent implements OnInit {
public menu:any=[];
public currentYear:Date;
anio: number = new Date().getFullYear();
  constructor(private http: HttpClient, private sys_user_service:sys_user_service, public dialog: MatDialog) {

this.currentYear=new Date("YYYY");
  }

  ngOnInit(): void {
this.menu=[
  {
    link:"sys_user_index",
    label:"Thành viên"
  },
  {
    link:"sys_user_index1",
    label:"Công việc"
  },

]
  }
}
