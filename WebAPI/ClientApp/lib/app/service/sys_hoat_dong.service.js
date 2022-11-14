import { __decorate, __metadata } from "tslib";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
// type products = productModel.product_model;
let sys_hoat_dong_service = class sys_hoat_dong_service {
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
    //lấy danh sách sys_hoat_dong
    DataHandel() {
        const url = this.REST_API_URL + '/sys_hoat_dong/DataHandel';
        return this.http.get(url);
    }
    //lấy danh sách sys_hoat_dong
    getAll() {
        const url = 'https://localhost:44334/sys_hoat_dong/GetAll';
        return this.http.get(url);
    }
    // thêm sys_hoat_dong
    add(sys_hoat_dongs) {
        const url = this.REST_API_URL + '/sys_hoat_dong/create';
        return this.http.post(url, sys_hoat_dongs);
    }
    // edit sys_hoat_dong
    edit(sys_hoat_dongs) {
        const url = this.REST_API_URL + '/sys_hoat_dong/edit';
        return this.http.post(url, sys_hoat_dongs);
    }
    // edit sys_hoat_dong
    delete(id) {
        const url = this.REST_API_URL + '/sys_hoat_dong/delete?id=' + id;
        return this.http.get(url);
    }
    //reven status sys_hot_dong
    reven_status(id) {
        const url = this.REST_API_URL + '/sys_hoat_dong/reven_status?id=' + id;
        return this.http.get(url);
    }
    // lấy danh sách sys_hoat_dong
    get_list_hoat_dong() {
        const url = this.REST_API_URL + '/sys_hoat_dong/get_list_hoat_dong';
        return this.http.get(url);
    }
    //lấy danh sách sys_hoat_dong
    DataHanlder(filter) {
        const url = this.REST_API_URL + '/sys_hoat_dong/DataHanlder';
        return this.http.post(url, filter);
    }
};
sys_hoat_dong_service = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [HttpClient])
], sys_hoat_dong_service);
export { sys_hoat_dong_service };
//# sourceMappingURL=sys_hoat_dong.service.js.map