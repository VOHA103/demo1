import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { sys_loai_cong_viec_model } from '../model/sys_loai_cong_viec.model';
// type products = productModel.product_model;

@Injectable({
  providedIn: 'root',
})
export class sys_loai_cong_viec_service {
  private REST_API_URL = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  //lấy danh sách sys_loai_cong_viec
  public DataHandel(): Observable<sys_loai_cong_viec_model[]> {
    const url = this.REST_API_URL + '/sys_loai_cong_viec/DataHandel';
    return this.http.get<sys_loai_cong_viec_model[]>(url);
  }
  //lấy danh sách sys_loai_cong_viec
  public getAll(): Observable<sys_loai_cong_viec_model[]> {
    const url = 'https://localhost:44334/sys_loai_cong_viec/GetAll';
    return this.http.get<sys_loai_cong_viec_model[]>(url);
  }
  // thêm sys_loai_cong_viec
  public add(sys_loai_cong_viecs: sys_loai_cong_viec_model) {
    const url = this.REST_API_URL + '/sys_loai_cong_viec/sys_loai_cong_viecs';
    return this.http.post(url, sys_loai_cong_viecs);
  }
  // edit sys_loai_cong_viec
  public edit(sys_loai_cong_viecs: sys_loai_cong_viec_model) {
    const url = this.REST_API_URL + '/sys_loai_cong_viec/edit';
    return this.http.post(url, sys_loai_cong_viecs);
  }
  // edit sys_loai_cong_viec
  public delete(id: string) {
    const url = this.REST_API_URL + '/sys_loai_cong_viec/delete?id=' + id;
    return this.http.get(url);
  }
}
