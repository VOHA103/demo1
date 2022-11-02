import { sys_bo_mon_service } from '../../service/sys_bo_mon.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
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
    private sys_bo_mon_service: sys_bo_mon_service,
    public dialog: MatDialog
  ) {}

onLogout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
  ngOnInit(): void {

  }
}