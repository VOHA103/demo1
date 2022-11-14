import { __decorate, __metadata } from "tslib";
import { sys_cau_hinh_admin_service } from '../../service/sys_cau_hinh_admin.service';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { sys_cau_hinh_admin_popupComponent } from './popupAdd.component';
let sys_cau_hinh_admin_indexComponent = class sys_cau_hinh_admin_indexComponent {
    http;
    sys_cau_hinh_admin_service;
    dialog;
    foods = [];
    listData = [];
    lst_status = [];
    model;
    loading = false;
    total = 0;
    page = 1;
    limit = 10;
    filter = { search: '', total: '0', page: '0', limit: '10', status_del: '1' };
    searchKey;
    constructor(http, sys_cau_hinh_admin_service, dialog) {
        this.http = http;
        this.sys_cau_hinh_admin_service = sys_cau_hinh_admin_service;
        this.dialog = dialog;
    }
    openDialogDetail(item) {
        const dialogRef = this.dialog.open(sys_cau_hinh_admin_popupComponent, {
            width: '850px',
            data: item,
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.DataHanlder();
        });
    }
    DataHanlder() {
        this.loading = false;
        this.sys_cau_hinh_admin_service.DataHanlder(this.filter).subscribe((resp) => {
            var model;
            model = resp;
            this.listData = model.data;
            this.total = model.total,
                this.loading = true;
        });
    }
    getOrders() {
    }
    goToPrevious() {
        this.page--;
        this.getOrders();
    }
    goToNext() {
        this.page++;
        this.getOrders();
    }
    goToPage(n) {
        this.page = n;
        this.getOrders();
    }
    onSearchClear() {
        this.searchKey = '';
        this.applyFilter();
    }
    applyFilter() {
        this.listData.filter = this.searchKey.trim().toLowerCase();
    }
    openDialogAdd() {
        const dialogRef = this.dialog.open(sys_cau_hinh_admin_popupComponent, {
            width: '850px',
            data: {
                db: {
                    id: 0,
                },
                lst_cong_viec: null,
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.DataHanlder();
        });
    }
    loadAPI() {
        this.loading = false;
        this.sys_cau_hinh_admin_service.getAll().subscribe((resp) => {
            this.listData = resp;
            this.loading = true;
        });
    }
    delete(id) {
        this.sys_cau_hinh_admin_service.delete(id).subscribe((result) => {
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
        this.sys_cau_hinh_admin_service.reven_status(id).subscribe((result) => {
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
sys_cau_hinh_admin_indexComponent = __decorate([
    Component({
        selector: 'sys_cau_hinh_admin_index',
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss'],
    }),
    __metadata("design:paramtypes", [HttpClient,
        sys_cau_hinh_admin_service,
        MatDialog])
], sys_cau_hinh_admin_indexComponent);
export { sys_cau_hinh_admin_indexComponent };
//# sourceMappingURL=index.component.js.map