import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { nav_indexComponent } from './auth/admin/nav.component';
import { sys_user_indexComponent } from './system/sys_user/sys_user.component';

const routes: Routes = [
  { path: "", component: nav_indexComponent },
  { path: "", component: nav_indexComponent ,children: [
    {
      path: "sys_user_index",
      component: sys_user_indexComponent
    },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
