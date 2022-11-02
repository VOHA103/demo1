import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { sys_bo_mon_giang_vien_model } from '../model/sys_bo_mon_giang_vien.model';
// type products = productModel.product_model;

@Injectable({
  providedIn: 'root',
})
export class sys_bo_mon_giang_vien_service {
  private REST_API_URL = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  //lấy danh sách sys_bo_mon_giang_vien
  public DataHandel(): Observable<sys_bo_mon_giang_vien_model[]> {
    const url = this.REST_API_URL + '/sys_bo_mon_giang_vien/DataHandel';
    return this.http.get<sys_bo_mon_giang_vien_model[]>(url);
  }
  //lấy danh sách sys_bo_mon_giang_vien
  public getAll(): Observable<sys_bo_mon_giang_vien_model[]> {
    const url = 'https://localhost:44334/sys_bo_mon_giang_vien/GetAll';
    return this.http.get<sys_bo_mon_giang_vien_model[]>(url);
  }
  // thêm sys_bo_mon_giang_vien
  public add(sys_bo_mon_giang_viens: sys_bo_mon_giang_vien_model) {
    const url = this.REST_API_URL + '/sys_bo_mon_giang_vien/create';
    return this.http.post(url, sys_bo_mon_giang_viens);
  }
  // edit sys_bo_mon_giang_vien
  public edit(sys_bo_mon_giang_viens: sys_bo_mon_giang_vien_model) {
    const url = this.REST_API_URL + '/sys_bo_mon_giang_vien/edit';
    return this.http.post(url, sys_bo_mon_giang_viens);
  }
  // edit sys_bo_mon_giang_vien
  public delete(id: string) {
    const url = this.REST_API_URL + '/sys_bo_mon_giang_vien/delete?id=' + id;
    return this.http.get(url);
  }
}
