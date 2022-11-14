import { __decorate, __metadata } from "tslib";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
// type products = productModel.product_model;
let sys_phong_truc_service = class sys_phong_truc_service {
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
    //lấy danh sách sys_phong_truc
    DataHandel() {
        const url = this.REST_API_URL + '/sys_phong_truc/DataHandel';
        return this.http.get(url);
    }
    //lấy danh sách sys_phong_truc
    getAll() {
        const url = 'https://localhost:44334/sys_phong_truc/GetAll';
        return this.http.get(url);
    }
    // thêm sys_phong_truc
    add(sys_phong_trucs) {
        const url = this.REST_API_URL + '/sys_phong_truc/create';
        return this.http.post(url, sys_phong_trucs);
    }
    // edit sys_phong_truc
    edit(sys_phong_trucs) {
        const url = this.REST_API_URL + '/sys_phong_truc/edit';
        return this.http.post(url, sys_phong_trucs);
    }
    // edit sys_phong_truc
    delete(id) {
        const url = this.REST_API_URL + '/sys_phong_truc/delete?id=' + id;
        return this.http.get(url);
    }
    // reven_status sys_phong_truc
    reven_status(id) {
        const url = this.REST_API_URL + '/sys_phong_truc/reven_status?id=' + id;
        return this.http.get(url);
    }
    // get list sys_phong_truc
    get_list_phong_truc() {
        const url = this.REST_API_URL + '/sys_phong_truc/get_list_phong_truc';
        return this.http.get(url);
    } //lấy danh sách sys_phong_truc
    DataHanlder(filter) {
        const url = this.REST_API_URL + '/sys_phong_truc/DataHanlder';
        return this.http.post(url, filter);
    }
};
sys_phong_truc_service = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [HttpClient])
], sys_phong_truc_service);
export { sys_phong_truc_service };
//# sourceMappingURL=sys_phong_truc.service.js.map