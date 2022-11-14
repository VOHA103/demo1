import { __decorate, __metadata } from "tslib";
import { sys_cong_viec_giang_vien_service } from '../../service/sys_cong_viec_giang_vien.service';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { ExcelServicesService } from '@/app/service/ExcelService';
import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
import { sys_cong_viec_service } from '../../service/sys_cong_viec.service';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import { sys_khoa_service } from '../../service/sys_khoa.service';
import { sys_bo_mon_service } from '../../service/sys_bo_mon.service';
import { sys_cong_viec_giang_vien_popupComponent } from './popupAdd.component';
let sys_cong_viec_giang_vien_indexComponent = class sys_cong_viec_giang_vien_indexComponent {
    http;
    sys_giang_vien_service;
    sys_cong_viec_service;
    sys_chuc_vu_service;
    sys_khoa_service;
    sys_bo_mon_service;
    sys_cong_viec_giang_vien_service;
    dialog;
    excelServicesService;
    foods = [];
    listData = [];
    lst_status = [];
    lst_khoa = [];
    lst_giang_vien = [];
    lst_cong_viec = [];
    lst_chuc_vu = [];
    model;
    loading = false;
    wopts = { bookType: 'xlsx', type: 'array' };
    fileName = 'SheetJS.xlsx';
    columsToDisplay = [
        'Chuc nang',
        '.No',
        'Ten giang vien',
        'Ten khoa',
        'Nhuoi tao',
        'Ngay tao',
        'Ghi chu',
    ];
    filter = {
        search: '',
        total: 0,
        page: 1,
        limit: 10,
        status_del: 1,
        id_giang_vien: '',
        id_cong_viec: '',
        id_chuc_vu: 0,
        id_bo_mon: 0,
        id_khoa: 0,
    };
    searchKey;
    constructor(http, sys_giang_vien_service, sys_cong_viec_service, sys_chuc_vu_service, sys_khoa_service, sys_bo_mon_service, sys_cong_viec_giang_vien_service, dialog, excelServicesService) {
        this.http = http;
        this.sys_giang_vien_service = sys_giang_vien_service;
        this.sys_cong_viec_service = sys_cong_viec_service;
        this.sys_chuc_vu_service = sys_chuc_vu_service;
        this.sys_khoa_service = sys_khoa_service;
        this.sys_bo_mon_service = sys_bo_mon_service;
        this.sys_cong_viec_giang_vien_service = sys_cong_viec_giang_vien_service;
        this.dialog = dialog;
        this.excelServicesService = excelServicesService;
    }
    openDialogDetail(item) {
        const dialogRef = this.dialog.open(sys_cong_viec_giang_vien_popupComponent, {
            width: '850px',
            data: item,
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.DataHanlder();
        });
    }
    openDialogAdd() {
        const dialogRef = this.dialog.open(sys_cong_viec_giang_vien_popupComponent, {
            width: '850px',
            data: {
                db: {
                    id: '0',
                },
                list_giang_vien: null,
            },
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            this.DataHanlder();
        });
    }
    goToPrevious() {
        this.filter.page--;
        this.DataHanlder();
    }
    goToNext() {
        this.filter.page++;
        this.DataHanlder();
    }
    goToPage(n) {
        this.filter.page = n;
        this.DataHanlder();
    }
    exportAsExcel() {
        this.excelServicesService.exportAsExcelFile(this.listData, 'CVGiangVien');
    }
    export() {
        let element = document.getElementById('excel-table');
        const ws = XLSX.utils.table_to_sheet(element);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'CongViecGVienSheer');
        // save to file
        XLSX.writeFile(wb, 'CongViecGiangVien.xlsx');
    }
    delete(id) {
        this.sys_cong_viec_giang_vien_service.delete(id).subscribe((result) => {
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {
                this.DataHanlder();
            });
        });
    }
    reven_status(id) {
        this.sys_cong_viec_giang_vien_service
            .reven_status(id)
            .subscribe((result) => {
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {
                this.DataHanlder();
            });
        });
    }
    DataHanlder() {
        debugger;
        this.loading = false;
        this.sys_cong_viec_giang_vien_service
            .DataHanlder(this.filter)
            .subscribe((resp) => {
            var model;
            model = resp;
            this.listData = model.data;
            this.filter.total = model.total;
            this.loading = true;
        });
    }
    get_list_giang_vien() {
        this.sys_giang_vien_service.get_list_giang_vien_change(this.filter.id_chuc_vu, this.filter.id_khoa).subscribe((result) => {
            this.lst_giang_vien = result;
        });
    }
    get_list_cong_viec() {
        this.sys_cong_viec_service.get_list_cong_viec().subscribe((result) => {
            this.lst_cong_viec = result;
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
        this.DataHanlder();
        this.get_list_chuc_vu();
        this.get_list_khoa();
        this.get_list_cong_viec();
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
sys_cong_viec_giang_vien_indexComponent = __decorate([
    Component({
        selector: 'sys_cong_viec_giang_vien_index',
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss'],
    }),
    __metadata("design:paramtypes", [HttpClient,
        sys_giang_vien_service,
        sys_cong_viec_service,
        sys_chuc_vu_service,
        sys_khoa_service,
        sys_bo_mon_service,
        sys_cong_viec_giang_vien_service,
        MatDialog,
        ExcelServicesService])
], sys_cong_viec_giang_vien_indexComponent);
export { sys_cong_viec_giang_vien_indexComponent };
//# sourceMappingURL=index.component.js.map