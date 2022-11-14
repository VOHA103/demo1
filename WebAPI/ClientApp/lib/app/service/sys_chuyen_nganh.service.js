import { __decorate, __metadata } from "tslib";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
// type products = productModel.product_model;
let sys_chuyen_nganh_service = class sys_chuyen_nganh_service {
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
    //lấy danh sách sys_chuyen_nganh
    DataHandel() {
        const url = this.REST_API_URL + '/sys_chuyen_nganh/DataHandel';
        return this.http.get(url);
    }
    //lấy danh sách sys_chuyen_nganh
    getAll() {
        const url = this.REST_API_URL + '/sys_chuyen_nganh/GetAll';
        return this.http.get(url);
    }
    // thêm sys_chuyen_nganh
    add(sys_chuyen_nganhs) {
        const url = this.REST_API_URL + '/sys_chuyen_nganh/create';
        return this.http.post(url, sys_chuyen_nganhs);
    }
    // edit sys_chuyen_nganh
    edit(sys_chuyen_nganhs) {
        const url = this.REST_API_URL + '/sys_chuyen_nganh/edit';
        return this.http.post(url, sys_chuyen_nganhs);
    }
    // edit sys_chuyen_nganh
    delete(id) {
        const url = this.REST_API_URL + '/sys_chuyen_nganh/delete?id=' + id;
        return this.http.get(url);
    }
    // reven status sys_chuyen_nganh
    reven_status(id) {
        const url = this.REST_API_URL + '/sys_chuyen_nganh/reven_status?id=' + id;
        return this.http.get(url);
    }
    //lấy danh sách sys_chuyen_nganh
    get_list_chuyen_nganh() {
        const url = this.REST_API_URL + '/sys_chuyen_nganh/get_list_chuyen_nganh';
        return this.http.get(url);
    }
    //lấy danh sách sys_chuyen_nganh
    DataHanlder(filter) {
        const url = this.REST_API_URL + '/sys_chuyen_nganh/DataHanlder';
        return this.http.post(url, filter);
    }
};
sys_chuyen_nganh_service = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [HttpClient])
], sys_chuyen_nganh_service);
export { sys_chuyen_nganh_service };
//# sourceMappingURL=sys_chuyen_nganh.service.js.map