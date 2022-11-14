import { __decorate, __metadata } from "tslib";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
// type products = productModel.product_model;
let sys_thong_bao_service = class sys_thong_bao_service {
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
    //lấy danh sách sys_thong_bao
    DataHandel() {
        const url = this.REST_API_URL + '/sys_thong_bao/DataHandel';
        return this.http.get(url);
    }
    //lấy danh sách sys_thong_bao
    getAll() {
        const url = 'https://localhost:44334/sys_thong_bao/GetAll';
        return this.http.get(url);
    }
    // thêm sys_thong_bao
    add(sys_thong_baos) {
        const url = this.REST_API_URL + '/sys_thong_bao/create';
        return this.http.post(url, sys_thong_baos);
    }
    // edit sys_thong_bao
    edit(sys_thong_baos) {
        const url = this.REST_API_URL + '/sys_thong_bao/edit';
        return this.http.post(url, sys_thong_baos);
    }
    // edit sys_thong_bao
    delete(id) {
        const url = this.REST_API_URL + '/sys_thong_bao/delete?id=' + id;
        return this.http.get(url);
    }
};
sys_thong_bao_service = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [HttpClient])
], sys_thong_bao_service);
export { sys_thong_bao_service };
//# sourceMappingURL=sys_thong_bao.service.js.map