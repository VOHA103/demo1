import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '@/app/database/user.data';
import { sys_user_service } from './../../service/sys_user.service';
@Component({
  selector: "sys_user_popup",
  templateUrl: "./sys_user_popup.component.html",
  styleUrls: ["./sys_user_popup.component.scss"],
})
export class sys_user_popupComponent implements OnInit {

  constructor(private http: HttpClient, private sys_user_service:sys_user_service, public dialog: MatDialog) {}

  ngOnInit(): void {
  }
}
