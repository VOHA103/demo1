import { sys_user_service } from '../../service/sys_user.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@/app/database/user.data';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'login_index',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class login_indexComponent implements OnInit {
  public user = new User;
  name: string = '';
  pass: string = '';
  hide= true;
  constructor(
    private http: HttpClient,
    private router: Router,
    private sys_user_service: sys_user_service,
    public dialog: MatDialog
  ) {}
  submit(): void {
    this.user.name = this.name;
    this.user.pass = this.pass;
    console.log(this.user);
    this.sys_user_service.login(this.user).subscribe((result: any) => {
      localStorage.setItem('token', result.token);
      this.router.navigateByUrl('/home');
    });
    (err) => {
      if (err.status == 400)
        Swal.fire({
          icon: 'success',
          title: 'Authentication failed.',
          showConfirmButton: false,
          timer: 2000,
        }).then((result) => {});
      else console.log(err);
    };
  }
  ngOnInit(): void {
    if (localStorage.getItem('token') != null)
    this.router.navigateByUrl('/home');
  }
}
