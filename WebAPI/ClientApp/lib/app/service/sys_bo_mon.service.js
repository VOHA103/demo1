import { __decorate, __metadata } from "tslib";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
('@angular/common/http');
import { Injectable } from '@angular/core';
let sys_bo_mon_service = class sys_bo_mon_service {
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
    //lấy danh sách sys_bo_mon
    DataHandel() {
        const url = this.REST_API_URL + '/sys_bo_mon/DataHandel';
        return this.http.get(url);
    }
    //lấy danh sách sys_bo_mon
    getAll() {
        const url = 'https://localhost:44334/sys_bo_mon/GetAll';
        return this.http.get(url);
    }
    // thêm sys_bo_mon
    add(data) {
        const url = this.REST_API_URL + '/sys_bo_mon/create';
        return this.http.post(url, data);
    }
    // edit sys_bo_mon
    edit(data) {
        const url = this.REST_API_URL + '/sys_bo_mon/edit';
        return this.http.post(url, data);
    }
    // edit sys_bo_mon
    delete(id) {
        const url = this.REST_API_URL + '/sys_bo_mon/delete?id=' + id;
        return this.http.get(url);
    }
    // reven status sys_khoa
    reven_status(id) {
        const url = this.REST_API_URL + '/sys_bo_mon/reven_status?id=' + id;
        return this.http.get(url);
    }
    // lấy danh sách sys_bo_mon
    get_list_bo_mon() {
        const url = this.REST_API_URL + '/sys_bo_mon/get_list_bo_mon';
        return this.http.get(url);
    }
    //lấy danh sách sys_bo_mon
    DataHanlder(filter) {
        const url = this.REST_API_URL + '/sys_bo_mon/DataHanlder';
        return this.http.post(url, filter);
    }
};
sys_bo_mon_service = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [HttpClient])
], sys_bo_mon_service);
export { sys_bo_mon_service };
//# sourceMappingURL=sys_bo_mon.service.js.map