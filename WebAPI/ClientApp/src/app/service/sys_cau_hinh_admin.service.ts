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
import { sys_cau_hinh_admin } from '../database/sys_cau_hinh_admin.data';
import { sys_cau_hinh_admin_model } from '../model/sys_cau_hinh_admin.model';
// type products = productModel.product_model;

@Injectable({
  providedIn: 'root',
})
export class sys_cau_hinh_admin_service {
  private REST_API_URL = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  //lấy danh sách sys_cau_hinh_admin
  public getAll(): Observable<sys_cau_hinh_admin_model[]> {
    const url = 'https://localhost:44334/sys_cau_hinh_admin/GetAll';
    return this.http.get<sys_cau_hinh_admin_model[]>(url);
  }
  // thêm sys_cau_hinh_admin
  public add(data: sys_cau_hinh_admin_model) {
    const url = this.REST_API_URL + '/sys_cau_hinh_admin/create';
    return this.http.post(url, data);
  }
  // edit sys_cau_hinh_admin
  public edit(data: sys_cau_hinh_admin_model) {
    const url = this.REST_API_URL + '/sys_cau_hinh_admin/edit';
    return this.http.post(url, data);
  }
  // edit sys_cau_hinh_admin
  public delete(id: string) {
    const url = this.REST_API_URL + '/sys_cau_hinh_admin/delete?id=' + id;
    return this.http.get(url);
  }
  // reven status sys_khoa
  public reven_status(id: string) {
    const url = this.REST_API_URL + '/sys_cau_hinh_admin/reven_status?id=' + id;
    return this.http.get(url);
  }
  // lấy danh sách sys_cau_hinh_admin
  public get_cau_hinh_admin():Observable<any[]>{
    const url=this.REST_API_URL+'/sys_cau_hinh_admin/get_cau_hinh_admin';
    return this.http.get<any[]>(url);
  }
  //lấy danh sách sys_cau_hinh_admin
  public DataHanlder(filter:any){
    const url = this.REST_API_URL + '/sys_cau_hinh_admin/DataHanlder';
    return this.http.post(url,filter);
  }
}
