import { MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, OnInit, Input,Inject } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable } from "rxjs";
import { sys_user_service } from './../../service/sys_user.service';
import { User } from '@/app/database/user.data';
// export class User{
//   Name : string;
//   PhoneNumber : Number;
// }
@Component({
  selector: "sys_user_popup",
  templateUrl: "./sys_user_popup.component.html",
  styleUrls: ["./sys_user_popup.component.scss"],
})
export class sys_user_popupComponent implements OnInit {


  user = new User();

  public foods:any=[];
  constructor(private http: HttpClient, private sys_user_service:sys_user_service, public dialog: MatDialog,  public dialogRef: MatDialogRef<sys_user_popupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {
      this.user=data;
    }
    Close(): void {
      this.dialogRef.close();
    }
    Save():void{
console.log(this.user);

    }
  ngOnInit(): void {
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
