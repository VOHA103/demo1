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
import { sys_cong_viec } from '../database/sys_cong_viec.data';
import { sys_cong_viec_model } from '../model/sys_cong_viec.model';
// type products = productModel.product_model;

@Injectable({
  providedIn: 'root',
})
export class sys_cong_viec_service {
  private REST_API_URL = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  //lấy danh sách sys_cong_viec
  public get_list_person_cong_viec(): Observable<sys_cong_viec_model[]> {
   const url = this.REST_API_URL + '/sys_cong_viec/get_list_person_cong_viec';
   return this.http.get<sys_cong_viec_model[]>(url);
 }
  //lấy danh sách sys_cong_viec
  public DataHandel(): Observable<sys_cong_viec_model[]> {
    const url = this.REST_API_URL + '/sys_cong_viec/DataHandel';
    return this.http.get<sys_cong_viec_model[]>(url);
  }
  //lấy danh sách sys_cong_viec
  public getAll(): Observable<sys_cong_viec_model[]> {
    const url = this.REST_API_URL + '/sys_cong_viec/GetAll';
    return this.http.get<sys_cong_viec_model[]>(url);
  }
  // thêm sys_cong_viec
  public add(sys_cong_viecs: sys_cong_viec_model) {
    const url = this.REST_API_URL + '/sys_cong_viec/create';
    return this.http.post(url, sys_cong_viecs);
  }
  // edit sys_cong_viec
  public edit(sys_cong_viecs: sys_cong_viec_model) {
    const url = this.REST_API_URL + '/sys_cong_viec/edit';
    return this.http.post(url, sys_cong_viecs);
  }
  // edit sys_cong_viec
  public delete(id: string) {
    const url = this.REST_API_URL + '/sys_cong_viec/delete?id=' + id;
    return this.http.get(url);
  }
  // reven status sys_cong_viec
  public reven_status(id: string) {
    const url = this.REST_API_URL + '/sys_cong_viec/reven_status?id=' + id;
    return this.http.get(url);
  }
  // get_list_cong_viec

  //lấy danh sách sys_cong_viec
  public get_list_cong_viec(): Observable<sys_cong_viec_model[]> {
    const url = this.REST_API_URL + '/sys_cong_viec/get_list_cong_viec';
    return this.http.get<sys_cong_viec_model[]>(url);
  }
  //lấy danh sách sys_cong_viec
  public DataHanlder(filter:any){
    const url = this.REST_API_URL + '/sys_cong_viec/DataHanlder';
    return this.http.post(url,filter);
  }
  // edit sys_cong_viec
  public get_list_cong_viec_khoa(id: any) {
    const url = this.REST_API_URL + '/sys_cong_viec/get_list_cong_viec_khoa?id_khoa=' + id;
    return this.http.get(url);
  }
  // edit sys_cong_viec
  public change_cong_viec_khoa() {
    const url = this.REST_API_URL + '/sys_cong_viec/change_cong_viec_khoa';
    return this.http.get(url);
  }
}
