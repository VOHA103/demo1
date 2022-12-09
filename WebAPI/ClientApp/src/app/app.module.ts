import { sys_khoa_indexComponent } from './admin_system/sys_khoa/index.component';

import { NgModule } from '@angular/core';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { sys_user_indexComponent } from './system/sys_user/index.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatRippleModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {MatNativeDateModule} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { nav_indexComponent } from './auth/admin/nav.component';
import { login_indexComponent } from './auth/login/login.component';
import { sys_user_service } from './service/sys_user.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaginationComponent } from './pagination/pagination.component';
import { sys_user_popupComponent } from './system/sys_user/popupAdd.component';
import { sys_giang_vien_truc_khoa_popupComponent } from './system/sys_giang_vien_truc_khoa/popupAdd.component';
import { sys_giang_vien_truc_khoa_indexComponent } from './system/sys_giang_vien_truc_khoa/index.component';
import { sys_hoat_dong_giang_vien_popupComponent } from './system/sys_hoat_dong_giang_vien/popupAdd.component';
import { sys_hoat_dong_giang_vien_indexComponent } from './system/sys_hoat_dong_giang_vien/index.component';
import { sys_phong_truc_popupComponent } from './system/sys_phong_truc/popupAdd.component';
import { sys_phong_truc_indexComponent } from './system/sys_phong_truc/index.component';
import { sys_thong_bao_popupComponent } from './system/sys_thong_bao/popupAdd.component';
import { sys_thong_bao_indexComponent } from './system/sys_thong_bao/index.component';
import { user_menuComponent } from './auth/user_menu/user_menu.component';
import { sys_hoat_dong_popupComponent } from './system/sys_hoat_dong/popupAdd.component';
import { sys_hoat_dong_indexComponent } from './system/sys_hoat_dong/index.component';
import { sys_cau_hinh_admin_popupComponent } from './system/sys_cau_hinh_admin/popupAdd.component';
import { sys_cau_hinh_admin_indexComponent } from './system/sys_cau_hinh_admin/index.component';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { reset_password_popupComponent } from './auth/reset_password/popupAdd.component';
import { UploadImageComponent } from './component/upload_image/index.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;
import { NgxPaginationModule } from 'ngx-pagination';
import { sys_thong_ke_khoa_indexComponent } from './admin_khoa/sys_thong_ke_khoa/index.component';
import { sys_cong_viec_giang_vien_admin_popupComponent } from './admin_system/sys_cong_viec_giang_vien_admin/popupAdd.component';
import { sys_cong_viec_giang_vien_admin_indexComponent } from './admin_system/sys_cong_viec_giang_vien_admin/index.component';
import { sys_giang_vien_khoa_popupComponent } from './admin_khoa/sys_giang_vien_khoa/popupAdd.component';
import { sys_giang_vien_khoa_indexComponent } from './admin_khoa/sys_giang_vien_khoa/index.component';
import { sys_giang_vien_edit_popupComponent } from './auth/user_menu/popupAdd.component';
import { sys_thong_ke_user_indexComponent } from './user_system/sys_thong_ke_user/index.component';
import { sys_person_work_indexComponent } from './user_system/sys_person_work/index.component';
import { sys_khoa_popupComponent } from './admin_system/sys_khoa/popupAdd.component';
// import { sys_cau_hinh_giao_dien_indexComponent } from './system/sys_cau_hinh_giao_dien/index.component';
// import { sys_cau_hinh_giao_dien_popupComponent } from './system/sys_cau_hinh_giao_dien/popupAdd.component';
import { sys_bo_mon_indexComponent } from './admin_khoa/sys_bo_mon/index.component';
import { sys_bo_mon_popupComponent } from './admin_khoa/sys_bo_mon/popupAdd.component';
import { sys_chuc_vu_popupComponent } from './admin_system/sys_chuc_vu/popupAdd.component';
import { sys_chuc_vu_indexComponent } from './admin_system/sys_chuc_vu/index.component';
import { sys_cong_viec_popupComponent } from './admin_khoa/sys_cong_viec/popupAdd.component';
import { sys_cong_viec_indexComponent } from './admin_khoa/sys_cong_viec/index.component';
import { sys_cong_viec_giang_vien_popupComponent } from './admin_khoa/sys_cong_viec_giang_vien/popupAdd.component';
import { sys_cong_viec_giang_vien_indexComponent } from './admin_khoa/sys_cong_viec_giang_vien/index.component';
import { sys_giang_vien_popupComponent } from './admin_system/sys_giang_vien/popupAdd.component';
import { sys_giang_vien_indexComponent } from './admin_system/sys_giang_vien/index.component';
import { sys_loai_cong_viec_popupComponent } from './admin_khoa/sys_loai_cong_viec/popupAdd.component';
import { sys_loai_cong_viec_indexComponent } from './admin_khoa/sys_loai_cong_viec/index.component';
import { sys_ky_truc_khoa_popupComponent } from './admin_khoa/sys_ky_truc_khoa/popupAdd.component';
import { sys_ky_truc_khoa_indexComponent } from './admin_khoa/sys_ky_truc_khoa/index.component';
import { sys_chuyen_nganh_popupComponent } from './admin_khoa/sys_chuyen_nganh/popupAdd.component';
import { sys_chuyen_nganh_indexComponent } from './admin_khoa/sys_chuyen_nganh/index.component';
import { sys_thong_ke_indexComponent } from './admin_system/sys_thong_ke_admin/index.component';
import { sys_cong_viec_giang_vien_admin_bo_mon_indexComponent } from './admin_bo_mon/sys_cong_viec_giang_vien/index.component';
import { sys_cong_viec_giang_vien_admin_bo_mon_popupComponent } from './admin_bo_mon/sys_cong_viec_giang_vien/popupAdd.component';

import { NgApexchartsModule } from 'ng-apexcharts';

import { sys_giang_vien_khoa_bo_mon_indexComponent } from './admin_bo_mon/sys_giang_vien/index.component';
import { sys_giang_vien_khoa_bo_mon_popupComponent } from './admin_bo_mon/sys_giang_vien/popupAdd.component';
import { sys_thong_ke_bo_mon_indexComponent } from './admin_bo_mon/sys_thong_ke/index.component';

@NgModule({
  declarations: [
    AppComponent,
    sys_thong_ke_bo_mon_indexComponent,
    sys_giang_vien_khoa_bo_mon_indexComponent,
    sys_giang_vien_khoa_bo_mon_popupComponent,
    sys_cau_hinh_admin_indexComponent,
    sys_cau_hinh_admin_popupComponent,
    sys_cong_viec_giang_vien_admin_bo_mon_indexComponent,
    sys_cong_viec_giang_vien_admin_bo_mon_popupComponent,
    sys_thong_ke_khoa_indexComponent,
    sys_cong_viec_giang_vien_admin_popupComponent,
    sys_cong_viec_giang_vien_admin_indexComponent,
    // sys_cau_hinh_giao_dien_indexComponent,
    // sys_cau_hinh_giao_dien_popupComponent,
    sys_giang_vien_khoa_popupComponent,
    sys_giang_vien_khoa_indexComponent,
    sys_giang_vien_edit_popupComponent,
    sys_thong_ke_user_indexComponent,
    sys_person_work_indexComponent,
    sys_user_indexComponent,
    nav_indexComponent,
    sys_user_popupComponent,
    login_indexComponent,
    PaginationComponent,
    sys_khoa_popupComponent,
    sys_khoa_indexComponent,
    sys_bo_mon_indexComponent,
    sys_bo_mon_popupComponent,
    sys_chuc_vu_popupComponent,
    sys_chuc_vu_indexComponent,
    sys_cong_viec_popupComponent,
    sys_cong_viec_indexComponent,
    sys_cong_viec_giang_vien_popupComponent,
    sys_cong_viec_giang_vien_indexComponent,
    sys_giang_vien_popupComponent,
    sys_giang_vien_indexComponent,
    sys_giang_vien_truc_khoa_popupComponent,
    sys_giang_vien_truc_khoa_indexComponent,
    sys_hoat_dong_popupComponent,
    sys_hoat_dong_indexComponent,
    sys_hoat_dong_giang_vien_popupComponent,
    sys_hoat_dong_giang_vien_indexComponent,
    sys_loai_cong_viec_popupComponent,
    sys_loai_cong_viec_indexComponent,
    sys_phong_truc_popupComponent,
    sys_phong_truc_indexComponent,
    sys_thong_bao_popupComponent,
    sys_thong_bao_indexComponent,
    user_menuComponent,
    sys_ky_truc_khoa_popupComponent,
    sys_ky_truc_khoa_indexComponent,
    sys_chuyen_nganh_popupComponent,
    sys_chuyen_nganh_indexComponent,
    sys_cau_hinh_admin_indexComponent,
    sys_cau_hinh_admin_popupComponent,
    CanvasJSChart,
    sys_thong_ke_indexComponent,
    reset_password_popupComponent,
    UploadImageComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgxPaginationModule,
    NgApexchartsModule,
  ],
  providers: [sys_user_service, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
],
  bootstrap: [AppComponent]
})
export class AppModule { }
