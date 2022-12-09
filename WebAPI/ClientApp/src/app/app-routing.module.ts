import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { nav_indexComponent } from './auth/admin/nav.component';
import { login_indexComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { sys_giang_vien_truc_khoa_indexComponent } from './system/sys_giang_vien_truc_khoa/index.component';
import { sys_hoat_dong_indexComponent } from './system/sys_hoat_dong/index.component';
import { sys_hoat_dong_giang_vien_indexComponent } from './system/sys_hoat_dong_giang_vien/index.component';
import { sys_phong_truc_indexComponent } from './system/sys_phong_truc/index.component';
import { sys_thong_bao_indexComponent } from './system/sys_thong_bao/index.component';
import { sys_cau_hinh_admin_indexComponent } from './system/sys_cau_hinh_admin/index.component';
import { sys_thong_ke_khoa_indexComponent } from './admin_khoa/sys_thong_ke_khoa/index.component';
import { sys_cong_viec_giang_vien_admin_indexComponent } from './admin_system/sys_cong_viec_giang_vien_admin/index.component';
import { sys_giang_vien_khoa_indexComponent } from './admin_khoa/sys_giang_vien_khoa/index.component';
import { sys_thong_ke_user_indexComponent } from './user_system/sys_thong_ke_user/index.component';
import { sys_person_work_indexComponent } from './user_system/sys_person_work/index.component';
import { sys_thong_ke_indexComponent } from './admin_system/sys_thong_ke_admin/index.component';
import { sys_user_indexComponent } from './system/sys_user/index.component';
import { sys_khoa_indexComponent } from './admin_system/sys_khoa/index.component';
import { sys_chuyen_nganh_indexComponent } from './admin_khoa/sys_chuyen_nganh/index.component';
import { sys_bo_mon_indexComponent } from './admin_khoa/sys_bo_mon/index.component';
import { sys_chuc_vu_indexComponent } from './admin_system/sys_chuc_vu/index.component';
import { sys_cong_viec_indexComponent } from './admin_khoa/sys_cong_viec/index.component';
import { sys_cong_viec_giang_vien_indexComponent } from './admin_khoa/sys_cong_viec_giang_vien/index.component';
import { sys_giang_vien_indexComponent } from './admin_system/sys_giang_vien/index.component';
import { sys_ky_truc_khoa_indexComponent } from './admin_khoa/sys_ky_truc_khoa/index.component';
import { sys_loai_cong_viec_indexComponent } from './admin_khoa/sys_loai_cong_viec/index.component';
import { sys_cong_viec_giang_vien_admin_bo_mon_indexComponent } from './admin_bo_mon/sys_cong_viec_giang_vien/index.component';


import { sys_giang_vien_khoa_bo_mon_indexComponent } from './admin_bo_mon/sys_giang_vien/index.component';
import { sys_thong_ke_bo_mon_indexComponent } from './admin_bo_mon/sys_thong_ke/index.component';
const routes: Routes = [
  { path: "login", component: login_indexComponent },
  { path: "", component: login_indexComponent },
  { path: "home", component: nav_indexComponent,canActivate:[AuthGuard] },
  { path: "", component: nav_indexComponent ,children: [

    {
      path: "sys_thong_ke_bo_mon_index",
      component: sys_thong_ke_bo_mon_indexComponent
    },
    {
      path: "sys_giang_vien_khoa_bo_mon_index",
      component: sys_giang_vien_khoa_bo_mon_indexComponent
    },
    {
      path: "sys_cong_viec_giang_vien_admin_bo_mon_index",
      component: sys_cong_viec_giang_vien_admin_bo_mon_indexComponent
    },
    {
      path: "sys_thong_ke_khoa_index",
      component: sys_thong_ke_khoa_indexComponent
    },
    {
      path: "sys_cong_viec_giang_vien_admin_index",
      component: sys_cong_viec_giang_vien_admin_indexComponent
    },
    {
      path: "sys_giang_vien_khoa_index",
      component: sys_giang_vien_khoa_indexComponent
    },
    {
      path: "sys_thong_ke_user_index",
      component: sys_thong_ke_user_indexComponent
    },
    {
      path: "sys_person_work_index",
      component: sys_person_work_indexComponent
    },
    {
      path: "sys_thong_ke_index",
      component: sys_thong_ke_indexComponent
    },
    {
      path: "sys_cau_hinh_admin_index",
      component:     sys_cau_hinh_admin_indexComponent,
    },
    {
      path: "sys_user_index",
      component: sys_user_indexComponent
    },
    {
      path: "sys_khoa_index",
      component: sys_khoa_indexComponent
    },
    {
      path: "sys_chuyen_nganh_index",
      component: sys_chuyen_nganh_indexComponent
    },
    {
      path: "sys_bo_mon_index",
      component: sys_bo_mon_indexComponent
    },
    {
      path: "sys_chuc_vu_index",
      component: sys_chuc_vu_indexComponent
    },
    {
      path: "sys_cong_viec_index",
      component: sys_cong_viec_indexComponent
    },
    {
      path: "sys_cong_viec_giang_vien_index",
      component: sys_cong_viec_giang_vien_indexComponent
    },
    {
      path: "sys_giang_vien_index",
      component: sys_giang_vien_indexComponent
    },
    {
      path: "sys_giang_vien_truc_khoa_index",
      component: sys_giang_vien_truc_khoa_indexComponent
    },
    {
      path: "sys_hoat_dong_index",
      component: sys_hoat_dong_indexComponent
    },
    {
      path: "sys_hoat_dong_giang_vien_index",
      component: sys_hoat_dong_giang_vien_indexComponent
    },
    {
      path: "sys_loai_cong_viec_index",
      component: sys_loai_cong_viec_indexComponent
    },
    {
      path: "sys_phong_truc_index",
      component: sys_phong_truc_indexComponent
    },
    {
      path: "sys_thong_bao_index",
      component: sys_thong_bao_indexComponent
    },
    {
      path: "sys_ky_truc_khoa_index",
      component: sys_ky_truc_khoa_indexComponent
    },

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
