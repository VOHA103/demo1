import { __decorate, __metadata } from "tslib";
import { sys_chuyen_nganh_service } from '../../service/sys_chuyen_nganh.service';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { sys_chuyen_nganh_popupComponent } from './popupAdd.component';
let sys_chuyen_nganh_indexComponent = class sys_chuyen_nganh_indexComponent {
    http;
    sys_chuyen_nganh_service;
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
    constructor(http, sys_chuyen_nganh_service, dialog) {
        this.http = http;
        this.sys_chuyen_nganh_service = sys_chuyen_nganh_service;
        this.dialog = dialog;
    }
    DataHanlder() {
        this.loading = false;
        this.sys_chuyen_nganh_service.DataHanlder(this.filter).subscribe((resp) => {
            var model;
            model = resp;
            this.listData = model.data;
            this.total = model.total,
                this.loading = true;
        });
    }
    openDialogDetail(item) {
        const dialogRef = this.dialog.open(sys_chuyen_nganh_popupComponent, {
            width: '850px',
            data: item,
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.loadAPI();
        });
    }
    getOrders() {
        // this._salesData.getOrders(this.page, this.limit)
        //   .subscribe(res => {
        //     console.log('Result from getOrders: ', res);
        //     this.orders = res['page']['data'];
        //     this.total = res['page'].total;
        //     this.loading = false;
        //   });
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
        const dialogRef = this.dialog.open(sys_chuyen_nganh_popupComponent, {
            width: '850px',
            data: {
                db: {
                    id: 0,
                },
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            this.loadAPI();
        });
    }
    loadAPI() {
        this.loading = false;
        this.sys_chuyen_nganh_service.getAll().subscribe((resp) => {
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
        this.sys_chuyen_nganh_service.delete(id).subscribe((result) => {
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                showConfirmButton: false,
                timer: 2000,
            }).then((result) => {
                this.loadAPI();
            });
        });
    }
    reven_status(id) {
        this.sys_chuyen_nganh_service.reven_status(id).subscribe((result) => {
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                showConfirmButton: false,
                timer: 2000,
            }).then((result) => {
                this.loadAPI();
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
sys_chuyen_nganh_indexComponent = __decorate([
    Component({
        selector: 'sys_chuyen_nganh_index',
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss'],
    }),
    __metadata("design:paramtypes", [HttpClient,
        sys_chuyen_nganh_service,
        MatDialog])
], sys_chuyen_nganh_indexComponent);
export { sys_chuyen_nganh_indexComponent };
//# sourceMappingURL=index.component.js.map