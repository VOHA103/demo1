import { __decorate, __metadata } from "tslib";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
// type products = productModel.product_model;
let sys_giang_vien_service = class sys_giang_vien_service {
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
    //lấy danh sách sys_giang_vien
    get_user_login() {
        const url = this.REST_API_URL + '/sys_giang_vien/get_user_login';
        return this.http.get(url);
    }
    //lấy danh sách sys_giang_vien
    getAll() {
        const url = this.REST_API_URL + '/sys_giang_vien/GetAll';
        return this.http.get(url);
    }
    // thêm sys_giang_vien
    add(sys_giang_viens) {
        debugger;
        const url = this.REST_API_URL + '/sys_giang_vien/create';
        return this.http.post(url, sys_giang_viens);
    }
    // edit sys_giang_vien
    edit(sys_giang_viens) {
        const url = this.REST_API_URL + '/sys_giang_vien/edit';
        return this.http.post(url, sys_giang_viens);
    }
    // edit sys_giang_vien
    delete(id) {
        const url = this.REST_API_URL + '/sys_giang_vien/delete?id=' + id;
        return this.http.get(url);
    }
    // reven status sys_giang_vien
    reven_status(id) {
        const url = this.REST_API_URL + '/sys_giang_vien/reven_status?id=' + id;
        return this.http.get(url);
    }
    //lấy danh sách sys_giang_vien
    get_list_giang_vien() {
        const url = this.REST_API_URL + '/sys_giang_vien/get_list_giang_vien';
        return this.http.get(url);
    }
    //lấy danh sách sys_giang_vien
    DataHanlder(filter) {
        const url = this.REST_API_URL + '/sys_giang_vien/DataHanlder';
        return this.http.post(url, filter);
    }
    //lấy danh sách sys_giang_vien
    get_list_giang_vien_change(id_chuc_vu, id_khoa) {
        const url = this.REST_API_URL + '/sys_giang_vien/get_list_giang_vien_change?id_chuc_vu=' + id_chuc_vu + '&id_khoa=' + id_khoa;
        return this.http.get(url);
    }
    //string pass, string pass_new, string pass_new_reset
    reset_pass(pass, pass_new, pass_new_reset) {
        const url = this.REST_API_URL + '/sys_giang_vien/reset_pass?pass=' + pass + '&pass_new=' + pass_new + '&pass_new_reset=' + pass_new_reset;
        return this.http.get(url);
    }
};
sys_giang_vien_service = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [HttpClient])
], sys_giang_vien_service);
export { sys_giang_vien_service };
//# sourceMappingURL=sys_giang_vien.service.js.map