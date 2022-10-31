import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { nav_indexComponent } from './auth/admin/nav.component';
import { login_indexComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { sys_user_indexComponent } from './system/sys_user/sys_user.component';
import { sys_khoa_indexComponent } from './system/sys_khoa/index.component';

const routes: Routes = [
  { path: "login", component: login_indexComponent },
  { path: "", component: login_indexComponent },
  { path: "home", component: nav_indexComponent,canActivate:[AuthGuard] },
  { path: "", component: nav_indexComponent ,children: [
    {
      path: "sys_user_index",
      component: sys_user_indexComponent
    },
    {
      path: "sys_khoa_index",
      component: sys_khoa_indexComponent
    },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
