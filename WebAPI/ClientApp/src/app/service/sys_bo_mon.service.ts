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
import { sys_bo_mon } from '../database/sys_bo_mon.data';
import { sys_bo_mon_model } from '../model/sys_bo_mon.model';
@Injectable({
  providedIn: 'root',
})
export class sys_bo_mon_service {
  private REST_API_URL = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  //lấy danh sách sys_bo_mon
  public DataHandel(): Observable<sys_bo_mon_model[]> {
    const url = this.REST_API_URL + '/sys_bo_mon/DataHandel';
    return this.http.get<sys_bo_mon_model[]>(url);
  }
  //lấy danh sách sys_bo_mon
  public getAll(): Observable<sys_bo_mon_model[]> {
    const url = 'https://localhost:44334/sys_bo_mon/GetAll';
    return this.http.get<sys_bo_mon_model[]>(url);
  }
  // thêm sys_bo_mon
  public add(data: sys_bo_mon_model) {
    const url = this.REST_API_URL + '/sys_bo_mon/create';
    return this.http.post(url, data);
  }
  // edit sys_bo_mon
  public edit(data: sys_bo_mon_model) {
    const url = this.REST_API_URL + '/sys_bo_mon/edit';
    return this.http.post(url, data);
  }
  // edit sys_bo_mon
  public delete(id: string) {
    const url = this.REST_API_URL + '/sys_bo_mon/delete?id=' + id;
    return this.http.get(url);
  }
  // reven status sys_khoa
  public reven_status(id: string) {
    const url = this.REST_API_URL + '/sys_bo_mon/reven_status?id=' + id;
    return this.http.get(url);
  }
  // lấy danh sách sys_bo_mon
  public get_list_bo_mon():Observable<any[]>{
    const url=this.REST_API_URL+'/sys_bo_mon/get_list_bo_mon';
    return this.http.get<any[]>(url);
  }
  //lấy danh sách sys_bo_mon
  public DataHanlder(filter:any){
    const url = this.REST_API_URL + '/sys_bo_mon/DataHanlder';
    return this.http.post(url,filter);
  }
  // edit sys_bo_mon
  public get_list_bo_mon_khoa(id: any) {
    const url = this.REST_API_URL + '/sys_bo_mon/get_list_bo_mon_khoa?id_khoa=' + id;
    return this.http.get(url);
  }
}
