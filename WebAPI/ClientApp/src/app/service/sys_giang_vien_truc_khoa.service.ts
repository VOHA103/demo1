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
import { sys_giang_vien_truc_khoa } from '../database/sys_giang_vien_truc_khoa.data';
import { sys_giang_vien_truc_khoa_model } from '../model/sys_giang_vien_truc_khoa.model';
// type products = productModel.product_model;

@Injectable({
  providedIn: 'root',
})
export class sys_giang_vien_truc_khoa_service {
  private REST_API_URL = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  //lấy danh sách sys_giang_vien_truc_khoa
  public DataHandel(): Observable<sys_giang_vien_truc_khoa_model[]> {
    const url = this.REST_API_URL + '/sys_giang_vien_truc_khoa/DataHandel';
    return this.http.get<sys_giang_vien_truc_khoa_model[]>(url);
  }
  //lấy danh sách sys_giang_vien_truc_khoa
  public getAll(): Observable<sys_giang_vien_truc_khoa_model[]> {
    const url = 'https://localhost:44334/sys_giang_vien_truc_khoa/GetAll';
    return this.http.get<sys_giang_vien_truc_khoa_model[]>(url);
  }
  // thêm sys_giang_vien_truc_khoa
  public add(sys_giang_vien_truc_khoas: sys_giang_vien_truc_khoa_model) {
    const url = this.REST_API_URL + '/sys_giang_vien_truc_khoa/create';
    return this.http.post(url, sys_giang_vien_truc_khoas);
  }
  // edit sys_giang_vien_truc_khoa
  public edit(sys_giang_vien_truc_khoas: sys_giang_vien_truc_khoa_model) {
    const url = this.REST_API_URL + '/sys_giang_vien_truc_khoa/edit';
    return this.http.post(url, sys_giang_vien_truc_khoas);
  }
  // edit sys_giang_vien_truc_khoa
  public delete(id: string) {
    const url = this.REST_API_URL + '/sys_giang_vien_truc_khoa/delete?id=' + id;
    return this.http.get(url);
  }
}
