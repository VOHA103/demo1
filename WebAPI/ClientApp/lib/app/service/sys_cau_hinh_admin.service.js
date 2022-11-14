import { __decorate, __metadata } from "tslib";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
// type products = productModel.product_model;
let sys_cau_hinh_admin_service = class sys_cau_hinh_admin_service {
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
    //lấy danh sách sys_cau_hinh_admin
    getAll() {
        const url = 'https://localhost:44334/sys_cau_hinh_admin/GetAll';
        return this.http.get(url);
    }
    // thêm sys_cau_hinh_admin
    add(data) {
        const url = this.REST_API_URL + '/sys_cau_hinh_admin/create';
        return this.http.post(url, data);
    }
    // edit sys_cau_hinh_admin
    edit(data) {
        const url = this.REST_API_URL + '/sys_cau_hinh_admin/edit';
        return this.http.post(url, data);
    }
    // edit sys_cau_hinh_admin
    delete(id) {
        const url = this.REST_API_URL + '/sys_cau_hinh_admin/delete?id=' + id;
        return this.http.get(url);
    }
    // reven status sys_khoa
    reven_status(id) {
        const url = this.REST_API_URL + '/sys_cau_hinh_admin/reven_status?id=' + id;
        return this.http.get(url);
    }
    // lấy danh sách sys_cau_hinh_admin
    get_cau_hinh_admin() {
        const url = this.REST_API_URL + '/sys_cau_hinh_admin/get_cau_hinh_admin';
        return this.http.get(url);
    }
    //lấy danh sách sys_cau_hinh_admin
    DataHanlder(filter) {
        const url = this.REST_API_URL + '/sys_cau_hinh_admin/DataHanlder';
        return this.http.post(url, filter);
    }
};
sys_cau_hinh_admin_service = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [HttpClient])
], sys_cau_hinh_admin_service);
export { sys_cau_hinh_admin_service };
//# sourceMappingURL=sys_cau_hinh_admin.service.js.map