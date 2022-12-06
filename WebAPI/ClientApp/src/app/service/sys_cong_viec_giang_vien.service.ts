import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';
import { sys_cong_viec_giang_vien } from '../database/sys_cong_viec_giang_vien.data';
import { sys_cong_viec_giang_vien_model } from '../model/sys_cong_viec_giang_vien.model';
// type products = productModel.product_model;

@Injectable({
  providedIn: 'root',
})
export class sys_cong_viec_giang_vien_service {
  private REST_API_URL = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  //lấy danh sách sys_khoa
  public DataHanlderAdmin(filter: any) {
    const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/DataHanlderAdmin';
    return this.http.post(url, filter);
  }
  //lấy danh sách sys_khoa
  public DataHanlder(filter: any) {
    const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/DataHanlder';
    return this.http.post(url, filter);
  }
  //lấy danh sách sys_cong_viec_giang_vien
  public getAll(): Observable<sys_cong_viec_giang_vien_model[]> {
    const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/GetAll';
    return this.http.get<sys_cong_viec_giang_vien_model[]>(url);
  }
  // thêm sys_cong_viec_giang_vien
  public add(sys_cong_viec_giang_viens: sys_cong_viec_giang_vien_model) {
    const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/create';
    return this.http.post(url, sys_cong_viec_giang_viens);
  }
  // edit sys_cong_viec_giang_vien
  public edit(sys_cong_viec_giang_viens: sys_cong_viec_giang_vien_model) {
    const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/edit';
    return this.http.post(url, sys_cong_viec_giang_viens);
  }
  // edit sys_cong_viec_giang_vien
  public delete(id: string) {
    const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/delete?id=' + id;
    return this.http.get(url);
  }
  // reven status sys_cong_viec_giang_vien
  public reven_status(id: string) {
    const url =
      this.REST_API_URL + '/sys_cong_viec_giang_vien/reven_status?id=' + id;
    return this.http.get(url);
  }
  //get_thong_ke_cong_viec
  public get_thong_ke_cong_viec(filter: any) {
    debugger
    const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/get_thong_ke_cong_viec';
    return this.http.post(url, filter);
  }
  //get_thong_ke_cong_viec
  public get_thong_ke_cong_viec_khoa(filter: any) {
    debugger
    const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/get_thong_ke_cong_viec_khoa';
    return this.http.post(url, filter);
  }
  //get_thong_ke_cong_viec
  public get_thong_ke_cong_viec_admin(filter: any) {
    debugger
    const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/get_thong_ke_cong_viec_admin';
    return this.http.post(url, filter);
  }
  // reven status sys_cong_viec_giang_vien
  public get_thong_ke_cong_viec_nguoi_dung(filter: any) {
    const url =
      this.REST_API_URL + '/sys_cong_viec_giang_vien/get_thong_ke_cong_viec_nguoi_dung';
    return this.http.post(url,filter);
  }
  // reven status sys_cong_viec_giang_vien
  public get_list_cong_viec_admin(filter: any) {
    const url =
      this.REST_API_URL + '/sys_cong_viec_giang_vien/get_list_cong_viec_admin';
    return this.http.post(url,filter);
  }
  // reven status sys_cong_viec_giang_vien
  public get_list_cong_viec_nguoi_dung(filter: any) {
    const url =
      this.REST_API_URL + '/sys_cong_viec_giang_vien/get_list_cong_viec_nguoi_dung';
    return this.http.post(url,filter);
  }
  //lấy danh sách sys_cong_viec
  public DataHanlderUser(filter:any){
    const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/DataHanlderUser';
    return this.http.post(url,filter);
  }
  //lấy danh sách sys_cong_viec
  public DataHanlderBo_mon(filter:any){
    const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/DataHanlderBo_mon';
    return this.http.post(url,filter);
  }
  //lấy danh sách sys_cong_viec
  public DataHanlderGiangVien(filter:any){
    const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/DataHanlderGiangVien';
    return this.http.post(url,filter);
  }

  //lấy danh sách sys_cong_viec
  public ExportExcel(filter:any){
    const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/ExportExcel';
    return this.http.post(url,filter);
  }
}
