import { __decorate, __metadata, __param } from "tslib";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import { sys_khoa_service } from '../../service/sys_khoa.service';
import { sys_bo_mon_service } from '../../service/sys_bo_mon.service';
import Swal from 'sweetalert2';
import { sys_giang_vien_model } from '@/app/model/sys_giang_vien.model';
let sys_giang_vien_popupComponent = class sys_giang_vien_popupComponent {
    http;
    sys_giang_vien_service;
    sys_chuc_vu_service;
    sys_khoa_service;
    sys_bo_mon_service;
    dialog;
    dialogRef;
    data;
    sys_giang_vien_model = new sys_giang_vien_model();
    lst_status = [];
    lst_khoa = [];
    lst_chuc_vu = [];
    lst_bo_mon = [];
    check_error = [];
    lst_chuyen_nghanh = [];
    lst_gioi_tinh = [];
    today = new Date();
    constructor(http, sys_giang_vien_service, sys_chuc_vu_service, sys_khoa_service, sys_bo_mon_service, dialog, dialogRef, data) {
        this.http = http;
        this.sys_giang_vien_service = sys_giang_vien_service;
        this.sys_chuc_vu_service = sys_chuc_vu_service;
        this.sys_khoa_service = sys_khoa_service;
        this.sys_bo_mon_service = sys_bo_mon_service;
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        //this.sys_giang_vien = data;
        this.sys_giang_vien_model = data;
        if (this.sys_giang_vien_model.db.id == '0') {
            this.Save();
        }
    }
    bind_data() {
        this.sys_giang_vien_model.db.username = this.sys_giang_vien_model.db.ma_giang_vien;
    }
    get_list_bo_mon() {
        this.sys_bo_mon_service
            .get_list_bo_mon()
            .subscribe((data) => (this.lst_bo_mon = data));
    }
    get_list_khoa() {
        this.sys_khoa_service
            .get_list_khoa()
            .subscribe((data) => {
            var result;
            result = data;
            this.lst_khoa = result;
            debugger;
            this.sys_giang_vien_model.db.id_khoa = this.lst_khoa[0].id;
        });
    }
    get_list_chuc_vu() {
        this.sys_chuc_vu_service
            .get_list_chuc_vu()
            .subscribe((data) => {
            var result;
            result = data;
            this.lst_chuc_vu = result;
            this.sys_giang_vien_model.db.id_chuc_vu = this.lst_chuc_vu[0].id;
        });
    }
    Close() {
        this.dialogRef.close();
    }
    Save() {
        debugger;
        this.sys_giang_vien_service
            .add(this.sys_giang_vien_model)
            .subscribe((result) => {
            var data = result;
            this.check_error = data.error;
            if (this.check_error.length === 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    showConfirmButton: false,
                    timer: 2000,
                }).then((result) => {
                    this.Close();
                });
            }
        });
    }
    Edit() {
        this.sys_giang_vien_service
            .edit(this.sys_giang_vien_model)
            .subscribe((result) => {
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                showConfirmButton: false,
                timer: 2000,
            }).then((result) => {
                this.Close();
            });
        });
    }
    ngOnInit() {
        this.get_list_chuc_vu();
        this.get_list_khoa();
        this.get_list_bo_mon();
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
        this.lst_gioi_tinh = [
            {
                id: 1,
                name: 'Nam',
            },
            {
                id: 2,
                name: 'Nữ',
            },
            {
                id: 3,
                name: 'Khác',
            },
        ];
        this.lst_chuyen_nghanh = [
            {
                id: 1,
                name: 'Công Nghệ Thông Tin',
            },
            {
                id: 2,
                name: 'An Toàn Thông Tin',
            }
        ];
        this.sys_giang_vien_model.db.id_chuyen_nghanh = this.lst_chuyen_nghanh[0].id;
        this.sys_giang_vien_model.db.id_khoa = this.lst_khoa[0].id;
        this.sys_giang_vien_model.db.id_chuc_vu = this.lst_chuc_vu[0].id;
    }
};
sys_giang_vien_popupComponent = __decorate([
    Component({
        selector: 'sys_giang_vien_popup',
        templateUrl: './popupAdd.component.html',
        styleUrls: ['./popupAdd.component.scss'],
    }),
    __param(7, Inject(MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [HttpClient,
        sys_giang_vien_service,
        sys_chuc_vu_service,
        sys_khoa_service,
        sys_bo_mon_service,
        MatDialog,
        MatDialogRef,
        sys_giang_vien_model])
], sys_giang_vien_popupComponent);
export { sys_giang_vien_popupComponent };
//# sourceMappingURL=popupAdd.component.js.map