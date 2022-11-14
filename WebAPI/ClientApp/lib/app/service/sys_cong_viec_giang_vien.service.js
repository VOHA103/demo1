import { __decorate, __metadata } from "tslib";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
// type products = productModel.product_model;
let sys_cong_viec_giang_vien_service = class sys_cong_viec_giang_vien_service {
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
    DataHanlder(filter) {
        const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/DataHanlder';
        return this.http.post(url, filter);
    }
    //lấy danh sách sys_cong_viec_giang_vien
    getAll() {
        const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/GetAll';
        return this.http.get(url);
    }
    // thêm sys_cong_viec_giang_vien
    add(sys_cong_viec_giang_viens) {
        const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/create';
        return this.http.post(url, sys_cong_viec_giang_viens);
    }
    // edit sys_cong_viec_giang_vien
    edit(sys_cong_viec_giang_viens) {
        const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/edit';
        return this.http.post(url, sys_cong_viec_giang_viens);
    }
    // edit sys_cong_viec_giang_vien
    delete(id) {
        const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/delete?id=' + id;
        return this.http.get(url);
    }
    // reven status sys_cong_viec_giang_vien
    reven_status(id) {
        const url = this.REST_API_URL + '/sys_cong_viec_giang_vien/reven_status?id=' + id;
        return this.http.get(url);
    }
    //get_thong_ke_cong_viec
    get_thong_ke_cong_viec(id_cong_viec, id_khoa, id_chuc_vu) {
        const url = this.REST_API_URL +
            '/sys_cong_viec_giang_vien/get_thong_ke_cong_viec?id_cong_viec=' +
            id_cong_viec +
            '?id_khoa=' +
            id_khoa +
            '?id_chuc_vu' +
            id_chuc_vu;
        return this.http.get(url);
    }
};
sys_cong_viec_giang_vien_service = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [HttpClient])
], sys_cong_viec_giang_vien_service);
export { sys_cong_viec_giang_vien_service };
//# sourceMappingURL=sys_cong_viec_giang_vien.service.js.map