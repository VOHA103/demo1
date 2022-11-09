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
import { sys_chuyen_nganh } from '../database/sys_chuyen_nganh.data';
import { sys_chuyen_nganh_model } from '../model/sys_chuyen_nganh.model';
// type products = productModel.product_model;

@Injectable({
  providedIn: 'root',
})
export class sys_chuyen_nganh_service {
  private REST_API_URL = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  //lấy danh sách sys_chuyen_nganh
  public DataHandel(): Observable<sys_chuyen_nganh_model[]> {
    const url = this.REST_API_URL + '/sys_chuyen_nganh/DataHandel';
    return this.http.get<sys_chuyen_nganh_model[]>(url);
  }
  //lấy danh sách sys_chuyen_nganh
  public getAll(): Observable<sys_chuyen_nganh_model[]> {
    const url = this.REST_API_URL + '/sys_chuyen_nganh/GetAll';
    return this.http.get<sys_chuyen_nganh_model[]>(url);
  }
  // thêm sys_chuyen_nganh
  public add(sys_chuyen_nganhs: sys_chuyen_nganh_model) {
    const url = this.REST_API_URL + '/sys_chuyen_nganh/create';
    return this.http.post(url, sys_chuyen_nganhs);
  }
  // edit sys_chuyen_nganh
  public edit(sys_chuyen_nganhs: sys_chuyen_nganh_model) {
    const url = this.REST_API_URL + '/sys_chuyen_nganh/edit';
    return this.http.post(url, sys_chuyen_nganhs);
  }
  // edit sys_chuyen_nganh
  public delete(id: string) {
    const url = this.REST_API_URL + '/sys_chuyen_nganh/delete?id=' + id;
    return this.http.get(url);
  }
  // reven status sys_chuyen_nganh
  public reven_status(id: string) {
    const url = this.REST_API_URL + '/sys_chuyen_nganh/reven_status?id=' + id;
    return this.http.get(url);
  }
  //lấy danh sách sys_chuyen_nganh
  public get_list_chuyen_nganh(): Observable<any[]> {
    const url = this.REST_API_URL + '/sys_chuyen_nganh/get_list_chuyen_nganh';
    return this.http.get<any[]>(url);
  }
  //lấy danh sách sys_chuyen_nganh
  public DataHanlder(filter:any){
    const url = this.REST_API_URL + '/sys_chuyen_nganh/DataHanlder';
    return this.http.post(url,filter);
  }
}
