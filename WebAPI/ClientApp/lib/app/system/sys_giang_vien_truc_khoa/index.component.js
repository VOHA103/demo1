import { __decorate, __metadata } from "tslib";
import { sys_giang_vien_truc_khoa_service } from '../../service/sys_giang_vien_truc_khoa.service';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sys_giang_vien_truc_khoa_popupComponent } from './popupAdd.component';
let sys_giang_vien_truc_khoa_indexComponent = class sys_giang_vien_truc_khoa_indexComponent {
    http;
    sys_giang_vien_truc_khoa_service;
    dialog;
    foods = [];
    listData = [];
    lst_status = [];
    model;
    loading = false;
    total = 0;
    page = 1;
    limit = 10;
    filter = { search: '', total: 0, page: 0, limit: 10 };
    searchKey;
    constructor(http, sys_giang_vien_truc_khoa_service, dialog) {
        this.http = http;
        this.sys_giang_vien_truc_khoa_service = sys_giang_vien_truc_khoa_service;
        this.dialog = dialog;
    }
    openDialogDetail(item) {
        const dialogRef = this.dialog.open(sys_giang_vien_truc_khoa_popupComponent, {
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
        const dialogRef = this.dialog.open(sys_giang_vien_truc_khoa_popupComponent, {
            width: '850px',
            data: {
                db: {
                    id: '0',
                },
                lst_cong_viec: null,
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            this.loadAPI();
        });
    }
    loadAPI() {
        this.loading = false;
        this.sys_giang_vien_truc_khoa_service.getAll().subscribe((resp) => {
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
        //   this.sys_giang_vien_truc_khoa_service.deleteUser(id).subscribe((result) => {
        //     Swal.fire({
        //       icon: 'success',
        //       title: 'Thành công',
        //       showConfirmButton: false,
        //       timer: 2000,
        //     }).then((result) => {
        //       this.loadAPI();
        //     });
        //   });
    }
    ngOnInit() {
        this.loadAPI();
        this.lst_status = [
            {
                id: '1',
                name: 'Thành viên',
            },
            {
                id: '2',
                name: 'Công việc',
            },
        ];
    }
};
sys_giang_vien_truc_khoa_indexComponent = __decorate([
    Component({
        selector: 'sys_giang_vien_truc_khoa_index',
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss'],
    }),
    __metadata("design:paramtypes", [HttpClient,
        sys_giang_vien_truc_khoa_service,
        MatDialog])
], sys_giang_vien_truc_khoa_indexComponent);
export { sys_giang_vien_truc_khoa_indexComponent };
//# sourceMappingURL=index.component.js.map