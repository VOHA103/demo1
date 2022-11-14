import { __decorate, __metadata } from "tslib";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
// type products = productModel.product_model;
let sys_giang_vien_truc_khoa_service = class sys_giang_vien_truc_khoa_service {
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
    //lấy danh sách sys_giang_vien_truc_khoa
    DataHandel() {
        const url = this.REST_API_URL + '/sys_giang_vien_truc_khoa/DataHandel';
        return this.http.get(url);
    }
    //lấy danh sách sys_giang_vien_truc_khoa
    getAll() {
        const url = 'https://localhost:44334/sys_giang_vien_truc_khoa/GetAll';
        return this.http.get(url);
    }
    // thêm sys_giang_vien_truc_khoa
    add(sys_giang_vien_truc_khoas) {
        const url = this.REST_API_URL + '/sys_giang_vien_truc_khoa/create';
        return this.http.post(url, sys_giang_vien_truc_khoas);
    }
    // edit sys_giang_vien_truc_khoa
    edit(sys_giang_vien_truc_khoas) {
        const url = this.REST_API_URL + '/sys_giang_vien_truc_khoa/edit';
        return this.http.post(url, sys_giang_vien_truc_khoas);
    }
    // edit sys_giang_vien_truc_khoa
    delete(id) {
        const url = this.REST_API_URL + '/sys_giang_vien_truc_khoa/delete?id=' + id;
        return this.http.get(url);
    }
};
sys_giang_vien_truc_khoa_service = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [HttpClient])
], sys_giang_vien_truc_khoa_service);
export { sys_giang_vien_truc_khoa_service };
//# sourceMappingURL=sys_giang_vien_truc_khoa.service.js.map