import { __decorate, __metadata, __param } from "tslib";
import { sys_ky_truc_khoa_model } from '../../model/sys_ky_truc_khoa.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sys_ky_truc_khoa_service } from '../../service/sys_ky_truc_khoa.service';
import Swal from 'sweetalert2';
let sys_ky_truc_khoa_popupComponent = class sys_ky_truc_khoa_popupComponent {
    http;
    sys_ky_truc_khoa_service;
    dialog;
    dialogRef;
    data;
    sys_ky_truc_khoa_model = new sys_ky_truc_khoa_model();
    lst_status = [];
    check_error = [];
    constructor(http, sys_ky_truc_khoa_service, dialog, dialogRef, data) {
        this.http = http;
        this.sys_ky_truc_khoa_service = sys_ky_truc_khoa_service;
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        //this.sys_ky_truc_khoa = data;
        this.sys_ky_truc_khoa_model = data;
        if (this.sys_ky_truc_khoa_model.db.id == 0)
            this.Save();
    }
    Close() {
        this.dialogRef.close();
    }
    Save() {
        this.sys_ky_truc_khoa_service.add(this.sys_ky_truc_khoa_model).subscribe((result) => {
            var data = result;
            this.check_error = data.error;
            if (this.check_error.length === 0) {
                this.Close();
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    showConfirmButton: false,
                    timer: 2000,
                }).then((result) => { });
            }
        });
    }
    Edit() {
        this.sys_ky_truc_khoa_service.edit(this.sys_ky_truc_khoa_model).subscribe((result) => {
            var data = result;
            this.check_error = data.error;
            if (this.check_error.length === 0) {
                this.Close();
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    showConfirmButton: false,
                    timer: 2000,
                }).then((result) => { });
            }
        });
    }
    ngOnInit() {
        this.lst_status = [
            {
                id: '1',
                name: 'Sử dụng',
            },
            {
                id: '2',
                name: 'Ngưng sử dụng',
            },
        ];
    }
};
sys_ky_truc_khoa_popupComponent = __decorate([
    Component({
        selector: 'sys_ky_truc_khoa_popup',
        templateUrl: './popupAdd.component.html',
        styleUrls: ['./popupAdd.component.scss'],
    }),
    __param(4, Inject(MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [HttpClient,
        sys_ky_truc_khoa_service,
        MatDialog,
        MatDialogRef,
        sys_ky_truc_khoa_model])
], sys_ky_truc_khoa_popupComponent);
export { sys_ky_truc_khoa_popupComponent };
//# sourceMappingURL=popupAdd.component.js.map