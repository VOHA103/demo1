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
  //lấy danh sách sys_cong_viec_giang_vien
  public DataHandel(): Observable<sys_cong_viec_giang_vien_model[]> {
    const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/DataHandel';
    return this.http.get<sys_cong_viec_giang_vien_model[]>(url);
  }
  //lấy danh sách sys_cong_viec_giang_vien
  public getAll(): Observable<sys_cong_viec_giang_vien_model[]> {
    const url = 'https://localhost:44334/sys_cong_viec_giang_vien/GetAll';
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
}