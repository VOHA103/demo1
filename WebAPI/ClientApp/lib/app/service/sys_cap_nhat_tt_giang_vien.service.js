import { __decorate, __metadata } from "tslib";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
// type products = productModel.product_model;
let sys_cap_nhat_tt_giang_vien_service = class sys_cap_nhat_tt_giang_vien_service {
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
    //lấy danh sách sys_cap_nhat_tt_giang_vien
    DataHandel() {
        const url = this.REST_API_URL + '/sys_cap_nhat_tt_giang_vien/DataHandel';
        return this.http.get(url);
    }
    //lấy danh sách sys_cap_nhat_tt_giang_vien
    getAll() {
        const url = 'https://localhost:44334/sys_cap_nhat_tt_giang_vien/GetAll';
        return this.http.get(url);
    }
    // thêm sys_cap_nhat_tt_giang_vien
    add(sys_cap_nhat_tt_giang_viens) {
        const url = this.REST_API_URL + '/sys_cap_nhat_tt_giang_vien/create';
        return this.http.post(url, sys_cap_nhat_tt_giang_viens);
    }
    // edit sys_cap_nhat_tt_giang_vien
    edit(sys_cap_nhat_tt_giang_viens) {
        const url = this.REST_API_URL + '/sys_cap_nhat_tt_giang_vien/edit';
        return this.http.post(url, sys_cap_nhat_tt_giang_viens);
    }
    // edit sys_cap_nhat_tt_giang_vien
    delete(id) {
        const url = this.REST_API_URL + '/sys_cap_nhat_tt_giang_vien/delete?id=' + id;
        return this.http.get(url);
    }
};
sys_cap_nhat_tt_giang_vien_service = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [HttpClient])
], sys_cap_nhat_tt_giang_vien_service);
export { sys_cap_nhat_tt_giang_vien_service };
//# sourceMappingURL=sys_cap_nhat_tt_giang_vien.service.js.map