import { __decorate, __metadata } from "tslib";
import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { sys_giang_vien_popupComponent } from './popupAdd.component';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import { sys_khoa_service } from '../../service/sys_khoa.service';
let sys_giang_vien_indexComponent = class sys_giang_vien_indexComponent {
    http;
    sys_chuc_vu_service;
    sys_khoa_service;
    sys_giang_vien_service;
    dialog;
    foods = [];
    listData = [];
    lst_status = [];
    model;
    loading = false;
    lst_khoa = [];
    lst_chuc_vu = [];
    total = 0;
    page = 1;
    limit = 10;
    filter = { search: '', total: '0', page: '0', limit: '10', status_del: '1', id_chuc_vu: '-1', id_khoa: '-1', id_chuyen_nghanh: '-1' };
    searchKey;
    constructor(http, sys_chuc_vu_service, sys_khoa_service, sys_giang_vien_service, dialog) {
        this.http = http;
        this.sys_chuc_vu_service = sys_chuc_vu_service;
        this.sys_khoa_service = sys_khoa_service;
        this.sys_giang_vien_service = sys_giang_vien_service;
        this.dialog = dialog;
        this.DataHanlder();
        this.get_list_khoa();
        this.get_list_chuc_vu();
    }
    get_list_khoa() {
        this.sys_khoa_service
            .get_list_khoa()
            .subscribe((data) => {
            var result;
            result = data;
            this.lst_khoa = result;
        });
    }
    get_list_chuc_vu() {
        this.sys_chuc_vu_service
            .get_list_chuc_vu()
            .subscribe((data) => {
            var result;
            result = data;
            this.lst_chuc_vu = result;
        });
    }
    DataHanlder() {
        this.loading = false;
        this.sys_giang_vien_service.DataHanlder(this.filter).subscribe((resp) => {
            var model;
            model = resp;
            this.listData = model.data;
            this.total = model.total,
                this.loading = true;
        });
    }
    openDialogDetail(item) {
        debugger;
        const dialogRef = this.dialog.open(sys_giang_vien_popupComponent, {
            width: '850px',
            data: item,
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.DataHanlder();
        });
    }
    goToPrevious() {
        this.page--;
        this.DataHanlder();
    }
    goToNext() {
        this.page++;
        this.DataHanlder();
    }
    goToPage(n) {
        this.page = n;
        this.DataHanlder();
    }
    openDialogAdd() {
        const dialogRef = this.dialog.open(sys_giang_vien_popupComponent, {
            width: '850px',
            data: {
                db: {
                    id: '0',
                },
                list_bo_mon: null,
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            this.DataHanlder();
        });
    }
    loadAPI() {
        this.loading = false;
        this.sys_giang_vien_service.getAll().subscribe((resp) => {
            this.listData = resp;
            // var result:any;
            // result = resp;
            // this.listData=result.data_list;
            // this.total=result.total,
            // this.page = result.page,
            // this.limit = result.limit,
            this.loading = true;
        });
    }
    delete(id) {
        this.sys_giang_vien_service.delete(id).subscribe((result) => {
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                showConfirmButton: false,
                timer: 2000,
            }).then((result) => {
                this.DataHanlder();
            });
        });
    }
    reven_status(id) {
        this.sys_giang_vien_service.reven_status(id).subscribe((result) => {
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                showConfirmButton: false,
                timer: 2000,
            }).then((result) => {
                this.DataHanlder();
            });
        });
    }
    ngOnInit() {
        this.DataHanlder();
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
sys_giang_vien_indexComponent = __decorate([
    Component({
        selector: 'sys_giang_vien_index',
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss'],
    }),
    __metadata("design:paramtypes", [HttpClient,
        sys_chuc_vu_service,
        sys_khoa_service,
        sys_giang_vien_service,
        MatDialog])
], sys_giang_vien_indexComponent);
export { sys_giang_vien_indexComponent };
//# sourceMappingURL=index.component.js.map