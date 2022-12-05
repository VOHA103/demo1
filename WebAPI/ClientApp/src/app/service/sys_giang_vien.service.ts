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
import { sys_giang_vien } from '../database/sys_giang_vien.data';
import { sys_giang_vien_model } from '../model/sys_giang_vien.model';
// type products = productModel.product_model;

@Injectable({
  providedIn: 'root',
})
export class sys_giang_vien_service {
  private REST_API_URL = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  //lấy danh sách sys_giang_vien
  public get_user_login(): Observable<any> {
    const url =  this.REST_API_URL + '/sys_giang_vien/get_user_login';
    return this.http.get<any>(url);
  }
  //lấy danh sách sys_giang_vien
  public getAll(): Observable<sys_giang_vien_model[]> {
    const url =  this.REST_API_URL + '/sys_giang_vien/GetAll';
    return this.http.get<sys_giang_vien_model[]>(url);
  }
  // thêm sys_giang_vien
  public add(sys_giang_viens: sys_giang_vien_model) {
    debugger
    const url = this.REST_API_URL + '/sys_giang_vien/create';
    return this.http.post(url, sys_giang_viens);
  }
  // thêm sys_giang_vien
  public add_GV_khoa(sys_giang_viens: sys_giang_vien_model) {
    const url = this.REST_API_URL + '/sys_giang_vien/create_giang_vien_khoa';
    return this.http.post(url, sys_giang_viens);
  }
  // thêm sys_giang_vien
  public create_giang_vien_khoa_bo_mon(sys_giang_viens: sys_giang_vien_model) {
    const url = this.REST_API_URL + '/sys_giang_vien/create_giang_vien_khoa_bo_mon';
    return this.http.post(url, sys_giang_viens);
  }
  // edit sys_giang_vien
  public edit(sys_giang_viens: sys_giang_vien_model) {
    const url = this.REST_API_URL + '/sys_giang_vien/edit';
    return this.http.post(url, sys_giang_viens);
  }
  // edit sys_giang_vien
  public delete(id: string) {
    const url = this.REST_API_URL + '/sys_giang_vien/delete?id=' + id;
    return this.http.get(url);
  }
  // edit sys_giang_vien
  public reset_password (id: string) {
    const url = this.REST_API_URL + '/sys_giang_vien/reset_password?id=' + id;
    return this.http.get(url);
  }
  // reven status sys_giang_vien
  public reven_status(id: string) {
    const url = this.REST_API_URL + '/sys_giang_vien/reven_status?id=' + id;
    return this.http.get(url);
  }
  //lấy danh sách sys_giang_vien
  public get_list_giang_vien(): Observable<sys_giang_vien_model[]> {
    const url =  this.REST_API_URL + '/sys_giang_vien/get_list_giang_vien';
    return this.http.get<sys_giang_vien_model[]>(url);
  }
  //lấy danh sách sys_giang_vien
  public DataHanlder(filter:any){
    const url = this.REST_API_URL + '/sys_giang_vien/DataHanlder';
    return this.http.post(url,filter);
  }
  //lấy danh sách sys_giang_vien
  public DataHanlderKhoa(filter:any){
    const url = this.REST_API_URL + '/sys_giang_vien/DataHanlderKhoa';
    return this.http.post(url,filter);
  }
  //lấy danh sách sys_giang_vien
  public DataHanlderKhoaBo_mon(filter:any){
    const url = this.REST_API_URL + '/sys_giang_vien/DataHanlderKhoaBo_mon';
    return this.http.post(url,filter);
  }
  //lấy danh sách sys_giang_vien
  public get_list_giang_vien_change(id_chuc_vu:any,id_khoa:any): Observable<sys_giang_vien_model[]> {
    const url =  this.REST_API_URL + '/sys_giang_vien/get_list_giang_vien_change?id_chuc_vu='+id_chuc_vu+'&id_khoa='+id_khoa;
    return this.http.get<sys_giang_vien_model[]>(url);
  }
  //lấy danh sách sys_giang_vien
  public get_list_giang_vien_bo_mon(id_bo_mon:any): Observable<sys_giang_vien_model[]> {
    const url =  this.REST_API_URL + '/sys_giang_vien/get_list_giang_vien_bo_mon?id_bo_mon='+id_bo_mon;
    return this.http.get<sys_giang_vien_model[]>(url);
  }
  //string pass, string pass_new, string pass_new_reset
  public reset_pass(pass:string,pass_new:string,pass_new_reset:string): Observable<sys_giang_vien_model[]> {
    const url =  this.REST_API_URL + '/sys_giang_vien/reset_pass?pass='+pass+'&pass_new='+pass_new+'&pass_new_reset='+pass_new_reset;
    return this.http.get<sys_giang_vien_model[]>(url);
  }
}
