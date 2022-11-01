import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { sys_hoat_dong_model } from '../model/sys_hoat_dong.model';
// type products = productModel.product_model;

@Injectable({
  providedIn: 'root',
})
export class sys_hoat_dong_service {
  private REST_API_URL = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  //lấy danh sách sys_hoat_dong
  public DataHandel(): Observable<sys_hoat_dong_model[]> {
    const url = this.REST_API_URL + '/sys_hoat_dong/DataHandel';
    return this.http.get<sys_hoat_dong_model[]>(url);
  }
  //lấy danh sách sys_hoat_dong
  public getAll(): Observable<sys_hoat_dong_model[]> {
    const url = 'https://localhost:44334/sys_hoat_dong/GetAll';
    return this.http.get<sys_hoat_dong_model[]>(url);
  }
  // thêm sys_hoat_dong
  public add(sys_hoat_dongs: sys_hoat_dong_model) {
    const url = this.REST_API_URL + '/sys_hoat_dong/sys_hoat_dongs';
    return this.http.post(url, sys_hoat_dongs);
  }
  // edit sys_hoat_dong
  public edit(sys_hoat_dongs: sys_hoat_dong_model) {
    const url = this.REST_API_URL + '/sys_hoat_dong/edit';
    return this.http.post(url, sys_hoat_dongs);
  }
  // edit sys_hoat_dong
  public delete(id: string) {
    const url = this.REST_API_URL + '/sys_hoat_dong/delete?id=' + id;
    return this.http.get(url);
  }
}
