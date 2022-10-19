import { sys_user_service } from '../../service/sys_user.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '@/app/database/user.data';
@Component({
  selector: "login_index",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class login_indexComponent implements OnInit {
  public user=new  User();
  name: string = '';
  pass: string = '';
  constructor(private http: HttpClient, private sys_user_service:sys_user_service, public dialog: MatDialog) {
  }
  submit():void{
this.user.name=this.name;
this.user.pass=this.pass;
console.log(this.user);

  }
  ngOnInit(): void {

  }
}
