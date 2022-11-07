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
import { sys_ky_truc_khoa } from '../database/sys_ky_truc_khoa.data';
import { sys_ky_truc_khoa_model } from '../model/sys_ky_truc_khoa.model';
// type products = productModel.product_model;

@Injectable({
  providedIn: 'root',
})
export class sys_ky_truc_khoa_service {
  private REST_API_URL = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  //lấy danh sách sys_ky_truc_khoa
  public DataHandel(): Observable<sys_ky_truc_khoa_model[]> {
    const url = this.REST_API_URL + '/sys_ky_truc_khoa/DataHandel';
    return this.http.get<sys_ky_truc_khoa_model[]>(url);
  }
  //lấy danh sách sys_ky_truc_khoa
  public getAll(): Observable<sys_ky_truc_khoa_model[]> {
    const url = 'https://localhost:44334/sys_ky_truc_khoa/GetAll';
    return this.http.get<sys_ky_truc_khoa_model[]>(url);
  }
  // thêm sys_ky_truc_khoa
  public add(sys_ky_truc_khoas: sys_ky_truc_khoa_model) {
    const url = this.REST_API_URL + '/sys_ky_truc_khoa/create';
    return this.http.post(url, sys_ky_truc_khoas);
  }
  // edit sys_ky_truc_khoa
  public edit(sys_ky_truc_khoas: sys_ky_truc_khoa_model) {
    const url = this.REST_API_URL + '/sys_ky_truc_khoa/edit';
    return this.http.post(url, sys_ky_truc_khoas);
  }
  // edit sys_ky_truc_khoa
  public delete(id: string) {
    const url = this.REST_API_URL + '/sys_ky_truc_khoa/delete?id=' + id;
    return this.http.get(url);
  }
  // reven status sys_ky_truc_khoa
  public reven_status(id: string) {
    const url = this.REST_API_URL + '/sys_ky_truc_khoa/reven_status?id=' + id;
    return this.http.get(url);
  }
  public get_list_ky_truc_khoa(): Observable<any[]> {
    const url = this.REST_API_URL + '/sys_ky_truc_khoa/get_list_ky_truc_khoa';
    return this.http.get<any[]>(url);
  }
  //lấy danh sách sys_ky_truc_khoa
  public DataHanlder(filter:any){
    const url = this.REST_API_URL + '/sys_ky_truc_khoa/DataHanlder';
    return this.http.post(url,filter);
  }
}
