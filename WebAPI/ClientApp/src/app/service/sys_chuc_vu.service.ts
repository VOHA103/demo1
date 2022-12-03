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
import { sys_chuc_vu } from '../database/sys_chuc_vu.data';
import { sys_chuc_vu_model } from '../model/sys_chuc_vu.model';
// type products = productModel.product_model;

@Injectable({
  providedIn: 'root',
})
export class sys_chuc_vu_service {
  private REST_API_URL = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  //lấy danh sách sys_chuc_vu
  public DataHandel(): Observable<sys_chuc_vu_model[]> {
    const url = this.REST_API_URL + '/sys_chuc_vu/DataHandel';
    return this.http.get<sys_chuc_vu_model[]>(url);
  }
  //lấy danh sách sys_chuc_vu
  public getAll(): Observable<sys_chuc_vu_model[]> {
    const url = this.REST_API_URL + '/sys_chuc_vu/GetAll';
    return this.http.get<sys_chuc_vu_model[]>(url);
  }
  // thêm sys_chuc_vu
  public add(sys_chuc_vus: sys_chuc_vu_model) {
    const url = this.REST_API_URL + '/sys_chuc_vu/create';
    return this.http.post(url, sys_chuc_vus);
  }
  // edit sys_chuc_vu
  public edit(sys_chuc_vus: sys_chuc_vu_model) {
    const url = this.REST_API_URL + '/sys_chuc_vu/edit';
    return this.http.post(url, sys_chuc_vus);
  }
  // edit sys_chuc_vu
  public delete(id: string) {
    const url = this.REST_API_URL + '/sys_chuc_vu/delete?id=' + id;
    return this.http.get(url);
  }
  // reven status sys_chuc_vu
  public reven_status(id: string) {
    const url = this.REST_API_URL + '/sys_chuc_vu/reven_status?id=' + id;
    return this.http.get(url);
  }
  //lấy danh sách sys_chuc_vu
  public get_list_chuc_vu(): Observable<any[]> {
    const url = this.REST_API_URL + '/sys_chuc_vu/get_list_chuc_vu';
    return this.http.get<any[]>(url);
  }
  //lấy danh sách sys_chuc_vu
  public get_list_chuc_vu_change(): Observable<any[]> {
    const url = this.REST_API_URL + '/sys_chuc_vu/get_list_chuc_vu_change';
    return this.http.get<any[]>(url);
  }
  //lấy danh sách sys_chuc_vu
  public DataHanlder(filter:any){
    const url = this.REST_API_URL + '/sys_chuc_vu/DataHanlder';
    return this.http.post(url,filter);
  }
}
