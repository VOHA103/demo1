import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { sys_thong_bao_model } from '../model/sys_thong_bao.mode';
// type products = productModel.product_model;

@Injectable({
  providedIn: 'root',
})
export class sys_thong_bao_service {
  private REST_API_URL = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  //lấy danh sách sys_thong_bao
  public DataHandel(): Observable<sys_thong_bao_model[]> {
    const url = this.REST_API_URL + '/sys_thong_bao/DataHandel';
    return this.http.get<sys_thong_bao_model[]>(url);
  }
  //lấy danh sách sys_thong_bao
  public getAll(): Observable<sys_thong_bao_model[]> {
    const url = 'https://localhost:44334/sys_thong_bao/GetAll';
    return this.http.get<sys_thong_bao_model[]>(url);
  }
  // thêm sys_thong_bao
  public add(sys_thong_baos: sys_thong_bao_model) {
    const url = this.REST_API_URL + '/sys_thong_bao/create';
    return this.http.post(url, sys_thong_baos);
  }
  // edit sys_thong_bao
  public edit(sys_thong_baos: sys_thong_bao_model) {
    const url = this.REST_API_URL + '/sys_thong_bao/edit';
    return this.http.post(url, sys_thong_baos);
  }
  // edit sys_thong_bao
  public delete(id: string) {
    const url = this.REST_API_URL + '/sys_thong_bao/delete?id=' + id;
    return this.http.get(url);
  }
}
