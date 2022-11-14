import { __decorate, __metadata } from "tslib";
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
import { sys_cong_viec_service } from '../../service/sys_cong_viec.service';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import { sys_khoa_service } from '../../service/sys_khoa.service';
import { sys_bo_mon_service } from '../../service/sys_bo_mon.service';
import { sys_cong_viec_giang_vien_service } from '../../service/sys_cong_viec_giang_vien.service';
let sys_thong_ke_indexComponent = class sys_thong_ke_indexComponent {
    http;
    dialog;
    sys_giang_vien_service;
    sys_cong_viec_service;
    sys_chuc_vu_service;
    sys_khoa_service;
    sys_bo_mon_service;
    sys_cong_viec_giang_vien_service;
    lst_status = [];
    lst_khoa = [];
    lst_giang_vien = [];
    lst_cong_viec = [];
    lst_data = [];
    lst_chuc_vu = [];
    filter = {
        id_cong_viec: '',
        id_chuc_vu: 0,
        id_khoa: 0,
    };
    constructor(http, dialog, sys_giang_vien_service, sys_cong_viec_service, sys_chuc_vu_service, sys_khoa_service, sys_bo_mon_service, sys_cong_viec_giang_vien_service) {
        this.http = http;
        this.dialog = dialog;
        this.sys_giang_vien_service = sys_giang_vien_service;
        this.sys_cong_viec_service = sys_cong_viec_service;
        this.sys_chuc_vu_service = sys_chuc_vu_service;
        this.sys_khoa_service = sys_khoa_service;
        this.sys_bo_mon_service = sys_bo_mon_service;
        this.sys_cong_viec_giang_vien_service = sys_cong_viec_giang_vien_service;
    }
    chartOptions = {
        title: {
            text: "Thống kê"
        },
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        axisY: {
            includeZero: true,
        },
        data: [{
                type: "column",
                color: "#01b8aa",
                dataPoints: [
                    { label: "Jan", y: 172 },
                    { label: "Feb", y: 189 },
                    { label: "Mar", y: 201 },
                    { label: "Apr", y: 240 },
                    { label: "May", y: 166 },
                    { label: "Jun", y: 196 },
                    { label: "Jul", y: 218 },
                    { label: "Aug", y: 167 },
                    { label: "Sep", y: 175 },
                    { label: "Oct", y: 152 },
                    { label: "Nov", y: 156 },
                    { label: "Dec", y: 164 }
                ]
            }]
    };
    get_list_cong_viec() {
        this.sys_cong_viec_service.get_list_cong_viec().subscribe((result) => {
            this.lst_cong_viec = result;
        });
    }
    get_thong_ke_cong_viec() {
        this.sys_cong_viec_giang_vien_service.get_thong_ke_cong_viec(this.filter.id_cong_viec, this.filter.id_khoa, this.filter.id_chuc_vu).subscribe((result) => {
            this.lst_data = result;
        });
    }
    get_list_khoa() {
        this.sys_khoa_service
            .get_list_khoa()
            .subscribe((data) => {
            this.lst_khoa = data;
        });
    }
    get_list_chuc_vu() {
        this.sys_chuc_vu_service
            .get_list_chuc_vu()
            .subscribe((data) => {
            this.lst_chuc_vu = data;
        });
    }
    ngOnInit() {
        this.get_list_chuc_vu();
        this.get_list_khoa();
        this.get_list_cong_viec();
        this.lst_status = [
            {
                id: '1',
                name: 'Đang sử dụng',
            },
            {
                id: '2',
                name: 'Ngưng sử dụng',
            },
        ];
    }
};
sys_thong_ke_indexComponent = __decorate([
    Component({
        selector: 'sys_thong_ke_index',
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss'],
    }),
    __metadata("design:paramtypes", [HttpClient, MatDialog,
        sys_giang_vien_service,
        sys_cong_viec_service,
        sys_chuc_vu_service,
        sys_khoa_service,
        sys_bo_mon_service,
        sys_cong_viec_giang_vien_service])
], sys_thong_ke_indexComponent);
export { sys_thong_ke_indexComponent };
//# sourceMappingURL=index.component.js.map