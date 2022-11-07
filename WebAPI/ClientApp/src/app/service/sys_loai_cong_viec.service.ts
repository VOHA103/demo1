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
  public DataHanlder(filter:any){
    const url = this.REST_API_URL + '/sys_loai_cong_viec/DataHanlder';
    return this.http.post(url,filter);
  }
  //lấy danh sách sys_loai_cong_viec
  public getAll(): Observable<sys_loai_cong_viec_model[]> {
    const url = this.REST_API_URL + '/sys_loai_cong_viec/GetAll';
    return this.http.get<sys_loai_cong_viec_model[]>(url);
  }
  //lấy danh sách sys_loai_cong_viec
  public get_list_use(): Observable<any[]> {
    const url = this.REST_API_URL + '/sys_loai_cong_viec/get_list_use';
    return this.http.get<any[]>(url);
  }
  // thêm sys_loai_cong_viec
  public add(sys_loai_cong_viecs: sys_loai_cong_viec_model) {
    const url = this.REST_API_URL + '/sys_loai_cong_viec/create';
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
  // reven status sys_loai_cong_viec
  public reven_status(id: string) {
    const url = this.REST_API_URL + '/sys_loai_cong_viec/reven_status?id=' + id;
    return this.http.get(url);
  }
}
