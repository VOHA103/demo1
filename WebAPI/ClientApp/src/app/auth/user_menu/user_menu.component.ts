import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { sys_giang_vien_popupComponent } from '@/app/system/sys_giang_vien/popupAdd.component';
@Component({
  selector: 'user_menu',
  templateUrl: './user_menu.component.html',
  styleUrls: ['./user_menu.component.scss'],
})
export class user_menuComponent implements OnInit {
  @Input() user_name: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private sys_giang_vien_service: sys_giang_vien_service,
    public dialog: MatDialog
  ) {}

onLogout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
get_user_login(): void {
this.sys_giang_vien_service.get_user_login().subscribe((result) => {
  const dialogRef = this.dialog.open(sys_giang_vien_popupComponent, {
    width: '850px',
    data: result,
  });

  dialogRef.afterClosed().subscribe((result) => {
  });
})
}
  ngOnInit(): void {

  }
}
