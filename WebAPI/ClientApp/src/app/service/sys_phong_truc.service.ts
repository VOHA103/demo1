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
import { sys_phong_truc } from '../database/sys_phong_truc.data';
import { sys_phong_truc_model } from '../model/sys_phong_truc.model';
// type products = productModel.product_model;

@Injectable({
  providedIn: 'root',
})
export class sys_phong_truc_service {
  private REST_API_URL = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  //lấy danh sách sys_phong_truc
  public DataHandel(): Observable<sys_phong_truc_model[]> {
    const url = this.REST_API_URL + '/sys_phong_truc/DataHandel';
    return this.http.get<sys_phong_truc_model[]>(url);
  }
  //lấy danh sách sys_phong_truc
  public getAll(): Observable<sys_phong_truc_model[]> {
    const url = 'https://localhost:44334/sys_phong_truc/GetAll';
    return this.http.get<sys_phong_truc_model[]>(url);
  }
  // thêm sys_phong_truc
  public add(sys_phong_trucs: sys_phong_truc_model) {
    const url = this.REST_API_URL + '/sys_phong_truc/create';
    return this.http.post(url, sys_phong_trucs);
  }
  // edit sys_phong_truc
  public edit(sys_phong_trucs: sys_phong_truc_model) {
    const url = this.REST_API_URL + '/sys_phong_truc/edit';
    return this.http.post(url, sys_phong_trucs);
  }
  // edit sys_phong_truc
  public delete(id: string) {
    const url = this.REST_API_URL + '/sys_phong_truc/delete?id=' + id;
    return this.http.get(url);
  }
  // reven_status sys_phong_truc
  public reven_status(id: string) {
    const url = this.REST_API_URL + '/sys_phong_truc/reven_status?id=' + id;
    return this.http.get(url);
  }
  // get list sys_phong_truc
  public get_list_phong_truc(): Observable<any[]> {
    const url = this.REST_API_URL + '/sys_phong_truc/get_list_phong_truc';
    return this.http.get<any[]>(url);
  } //lấy danh sách sys_phong_truc
  public DataHanlder(filter: any) {
    const url = this.REST_API_URL + '/sys_phong_truc/DataHanlder';
    return this.http.post(url, filter);
  }
}
