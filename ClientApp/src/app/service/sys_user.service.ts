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
  public getAll(): Observable<user_model[]> {
    const url = "https://localhost:44334/User/GetAll";
    return this.http.get<user_model[]>(url);
  }
  // thêm user
  public addUser(users: user_model) {
    const url = "https://localhost:44334/User/users";
    return this.http.post(url, users);
  }
  //login
  public login(users: User) {
    const url = "https://localhost:44334/User/";
    return this.http.post(url, users);
  }
}
