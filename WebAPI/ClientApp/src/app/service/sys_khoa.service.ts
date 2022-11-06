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
import { sys_khoa } from '../database/sys_khoa.data';
import { sys_khoa_model } from '../model/sys_khoa.model';
// type products = productModel.product_model;

@Injectable({
  providedIn: 'root',
})
export class sys_khoa_service {
  private REST_API_URL = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  //lấy danh sách sys_khoa
  public DataHandel(): Observable<sys_khoa_model[]> {
    const url = this.REST_API_URL + '/sys_khoa/DataHandel';
    return this.http.get<sys_khoa_model[]>(url);
  }
  //lấy danh sách sys_khoa
  public getAll(): Observable<sys_khoa_model[]> {
    const url = this.REST_API_URL + '/sys_khoa/GetAll';
    return this.http.get<sys_khoa_model[]>(url);
  }
  // thêm sys_khoa
  public add(data: sys_khoa_model) {
    const url = this.REST_API_URL + '/sys_khoa/create';
    return this.http.post(url, data);
  }
  // edit sys_khoa
  public edit(data: sys_khoa_model) {
    debugger
    const url = this.REST_API_URL + '/sys_khoa/edit';
    return this.http.post(url, data);
  }
  // delete sys_khoa
  public delete(id: string) {
    const url = this.REST_API_URL + '/sys_khoa/delete?id=' + id;
    return this.http.get(url);
  }
  // reven status sys_khoa
  public reven_status(id: string) {
    const url = this.REST_API_URL + '/sys_khoa/reven_status?id=' + id;
    return this.http.get(url);
  }
  //lấy danh sách sys_khoa
  public get_list_khoa(): Observable<any[]> {
    const url = this.REST_API_URL + '/sys_khoa/get_list_khoa';
    return this.http.get<any[]>(url);
  }

  //lấy danh sách sys_khoa
  public DataHanlder(filter:any){
    const url = this.REST_API_URL + '/sys_khoa/DataHanlder';
    return this.http.post(url,filter);
  }
}
