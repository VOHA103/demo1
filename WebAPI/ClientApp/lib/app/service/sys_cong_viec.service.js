import { __decorate, __metadata } from "tslib";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
// type products = productModel.product_model;
let sys_cong_viec_service = class sys_cong_viec_service {
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
    //lấy danh sách sys_cong_viec
    DataHandel() {
        const url = this.REST_API_URL + '/sys_cong_viec/DataHandel';
        return this.http.get(url);
    }
    //lấy danh sách sys_cong_viec
    getAll() {
        const url = this.REST_API_URL + '/sys_cong_viec/GetAll';
        return this.http.get(url);
    }
    // thêm sys_cong_viec
    add(sys_cong_viecs) {
        const url = this.REST_API_URL + '/sys_cong_viec/create';
        return this.http.post(url, sys_cong_viecs);
    }
    // edit sys_cong_viec
    edit(sys_cong_viecs) {
        const url = this.REST_API_URL + '/sys_cong_viec/edit';
        return this.http.post(url, sys_cong_viecs);
    }
    // edit sys_cong_viec
    delete(id) {
        const url = this.REST_API_URL + '/sys_cong_viec/delete?id=' + id;
        return this.http.get(url);
    }
    // reven status sys_cong_viec
    reven_status(id) {
        const url = this.REST_API_URL + '/sys_cong_viec/reven_status?id=' + id;
        return this.http.get(url);
    }
    // get_list_cong_viec
    //lấy danh sách sys_cong_viec
    get_list_cong_viec() {
        const url = this.REST_API_URL + '/sys_cong_viec/get_list_cong_viec';
        return this.http.get(url);
    }
    //lấy danh sách sys_cong_viec
    DataHanlder(filter) {
        const url = this.REST_API_URL + '/sys_cong_viec/DataHanlder';
        return this.http.post(url, filter);
    }
};
sys_cong_viec_service = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [HttpClient])
], sys_cong_viec_service);
export { sys_cong_viec_service };
//# sourceMappingURL=sys_cong_viec.service.js.map