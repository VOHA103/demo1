import { __decorate, __metadata } from "tslib";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
// type products = productModel.product_model;
let sys_chuc_vu_service = class sys_chuc_vu_service {
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
    //lấy danh sách sys_chuc_vu
    DataHandel() {
        const url = this.REST_API_URL + '/sys_chuc_vu/DataHandel';
        return this.http.get(url);
    }
    //lấy danh sách sys_chuc_vu
    getAll() {
        const url = this.REST_API_URL + '/sys_chuc_vu/GetAll';
        return this.http.get(url);
    }
    // thêm sys_chuc_vu
    add(sys_chuc_vus) {
        const url = this.REST_API_URL + '/sys_chuc_vu/create';
        return this.http.post(url, sys_chuc_vus);
    }
    // edit sys_chuc_vu
    edit(sys_chuc_vus) {
        const url = this.REST_API_URL + '/sys_chuc_vu/edit';
        return this.http.post(url, sys_chuc_vus);
    }
    // edit sys_chuc_vu
    delete(id) {
        const url = this.REST_API_URL + '/sys_chuc_vu/delete?id=' + id;
        return this.http.get(url);
    }
    // reven status sys_chuc_vu
    reven_status(id) {
        const url = this.REST_API_URL + '/sys_chuc_vu/reven_status?id=' + id;
        return this.http.get(url);
    }
    //lấy danh sách sys_chuc_vu
    get_list_chuc_vu() {
        const url = this.REST_API_URL + '/sys_chuc_vu/get_list_chuc_vu';
        return this.http.get(url);
    }
    //lấy danh sách sys_chuc_vu
    DataHanlder(filter) {
        const url = this.REST_API_URL + '/sys_chuc_vu/DataHanlder';
        return this.http.post(url, filter);
    }
};
sys_chuc_vu_service = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [HttpClient])
], sys_chuc_vu_service);
export { sys_chuc_vu_service };
//# sourceMappingURL=sys_chuc_vu.service.js.map