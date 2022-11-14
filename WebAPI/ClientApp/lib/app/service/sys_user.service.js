import { __decorate, __metadata } from "tslib";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
// type products = productModel.product_model;
let sys_user_service = class sys_user_service {
    http;
    REST_API_URL = environment.api;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(http) {
        this.http = http;
    }
    //lấy danh sách user
    DataHandel() {
        const url = this.REST_API_URL + "/User/get_list_user";
        return this.http.get(url);
    }
    //lấy danh sách user
    getAll() {
        const url = this.REST_API_URL + "/User/GetAll";
        return this.http.get(url);
    }
    //lấy thông tin user
    get_profile_user() {
        const url = this.REST_API_URL + "/User/get_profile_user";
        return this.http.get(url);
    }
    //lấy danh sách user
    get_id_user() {
        const url = this.REST_API_URL + "/User/get_id_user";
        return this.http.get(url);
    }
    // thêm user
    addUser(users) {
        const url = this.REST_API_URL + "/User/create";
        return this.http.post(url, users);
    }
    // edit user
    editUser(users) {
        const url = this.REST_API_URL + "/User/edit";
        return this.http.post(url, users);
    }
    // edit user
    deleteUser(id) {
        const url = this.REST_API_URL + "/User/delete?id=" + id;
        return this.http.get(url);
    }
    //login
    login(users) {
        const url = this.REST_API_URL + "/User/login";
        return this.http.post(url, users);
    }
};
sys_user_service = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [HttpClient])
], sys_user_service);
export { sys_user_service };
//# sourceMappingURL=sys_user.service.js.map