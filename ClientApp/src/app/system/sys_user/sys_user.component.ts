import { sys_user_service } from './../../service/sys_user.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";
import { sys_user_popupComponent } from './sys_user_popup.component';

@Component({
  selector: "sys_user_index",
  templateUrl: "./sys_user.component.html",
  styleUrls: ["./sys_user.component.scss"],
})
export class sys_user_indexComponent implements OnInit {
  public foods:any=[];
  public listData:any=[];
  constructor(private http: HttpClient, private sys_user_service:sys_user_service, public dialog: MatDialog) {

  }
  openDialogAdd(): void {
    const dialogRef = this.dialog.open(sys_user_popupComponent, {
      width: '850px',
      data: {
        id:0
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  loadAPI() {
    this.sys_user_service.getAll().subscribe((data) => {
      this.listData=data;
    console.log(this.listData);
    });
  }
  ngOnInit(): void {
    this.loadAPI();
    this.foods=[
      {
        value:"sys_user_index",
        viewValue:"Thành viên"
      },
      {
        value:"sys_user_index1",
        viewValue:"Công việc"
      },
    ]
  }
}
