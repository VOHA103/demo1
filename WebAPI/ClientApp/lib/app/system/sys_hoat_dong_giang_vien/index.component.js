import { __decorate, __metadata } from "tslib";
import { sys_hoat_dong_giang_vien_service } from '../../service/sys_hoat_dong_giang_vien.service';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sys_hoat_dong_giang_vien_popupComponent } from './popupAdd.component';
let sys_hoat_dong_giang_vien_indexComponent = class sys_hoat_dong_giang_vien_indexComponent {
    http;
    sys_hoat_dong_giang_vien_service;
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
    constructor(http, sys_hoat_dong_giang_vien_service, dialog) {
        this.http = http;
        this.sys_hoat_dong_giang_vien_service = sys_hoat_dong_giang_vien_service;
        this.dialog = dialog;
    }
    //   reven_status(id): void {
    //    this.sys_hoat_dong_service.reven_status(id).subscribe((result) => {
    //      Swal.fire({
    //        icon: 'success',
    //        title: 'Thành công',
    //        showConfirmButton: false,
    //        timer: 2000,
    //      }).then((result) => {
    //        this.DataHanlder();
    //      });
    //    });
    //  }
    openDialogDetail(item) {
        const dialogRef = this.dialog.open(sys_hoat_dong_giang_vien_popupComponent, {
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
        const dialogRef = this.dialog.open(sys_hoat_dong_giang_vien_popupComponent, {
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
        this.sys_hoat_dong_giang_vien_service.getAll().subscribe((resp) => {
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
        //   this.sys_hoat_dong_giang_vien_service.deleteUser(id).subscribe((result) => {
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
sys_hoat_dong_giang_vien_indexComponent = __decorate([
    Component({
        selector: 'sys_hoat_dong_giang_vien_index',
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss'],
    }),
    __metadata("design:paramtypes", [HttpClient,
        sys_hoat_dong_giang_vien_service,
        MatDialog])
], sys_hoat_dong_giang_vien_indexComponent);
export { sys_hoat_dong_giang_vien_indexComponent };
//# sourceMappingURL=index.component.js.map