import { __decorate, __metadata } from "tslib";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
// type products = productModel.product_model;
let sys_khoa_service = class sys_khoa_service {
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
    //lấy danh sách sys_khoa
    DataHandel() {
        const url = this.REST_API_URL + '/sys_khoa/DataHandel';
        return this.http.get(url);
    }
    //lấy danh sách sys_khoa
    getAll() {
        const url = this.REST_API_URL + '/sys_khoa/GetAll';
        return this.http.get(url);
    }
    // thêm sys_khoa
    add(data) {
        const url = this.REST_API_URL + '/sys_khoa/create';
        return this.http.post(url, data);
    }
    // edit sys_khoa
    edit(data) {
        debugger;
        const url = this.REST_API_URL + '/sys_khoa/edit';
        return this.http.post(url, data);
    }
    // delete sys_khoa
    delete(id) {
        const url = this.REST_API_URL + '/sys_khoa/delete?id=' + id;
        return this.http.get(url);
    }
    // reven status sys_khoa
    reven_status(id) {
        const url = this.REST_API_URL + '/sys_khoa/reven_status?id=' + id;
        return this.http.get(url);
    }
    //lấy danh sách sys_khoa
    get_list_khoa() {
        const url = this.REST_API_URL + '/sys_khoa/get_list_khoa';
        return this.http.get(url);
    }
    //lấy danh sách sys_khoa
    DataHanlder(filter) {
        const url = this.REST_API_URL + '/sys_khoa/DataHanlder';
        return this.http.post(url, filter);
    }
};
sys_khoa_service = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [HttpClient])
], sys_khoa_service);
export { sys_khoa_service };
//# sourceMappingURL=sys_khoa.service.js.map