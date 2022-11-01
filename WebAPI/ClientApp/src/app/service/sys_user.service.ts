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
import { User } from '../database/user.data';
import { user_model } from '../model/user.model';
// type products = productModel.product_model;

@Injectable({
  providedIn: 'root',
})
export class sys_user_service {
  private REST_API_URL = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}
  //lấy danh sách user
  public DataHandel():Observable<user_model[]>{
    const url = this.REST_API_URL+"/User/get_list_user";
    return this.http.get<user_model[]>(url);
  }
   //lấy danh sách user
   public getAll(): Observable<user_model[]> {
    const url = this.REST_API_URL+"/User/GetAll";
    return this.http.get<user_model[]>(url);
  }
    //lấy thông tin user
    public get_profile_user(){
      const url = this.REST_API_URL+"/User/get_profile_user";
      return this.http.get(url);
    }
    //lấy danh sách user
    public get_id_user(){
      const url = this.REST_API_URL+"/User/get_id_user";
      return this.http.get(url);
    }
  // thêm user
  public addUser(users: user_model) {
    const url = this.REST_API_URL+"/User/create";
    return this.http.post(url, users);
  }
  // edit user
  public editUser(users: user_model) {
    const url = this.REST_API_URL+"/User/edit";
    return this.http.post(url, users);
  }
  // edit user
  public deleteUser(id: string) {
    const url = this.REST_API_URL+"/User/delete?id="+id;
    return this.http.get(url);
  }
  //login
  public login(users: User) {
    const url = this.REST_API_URL+"/User/login";
    return this.http.post(url, users);
  }
}
