import { __decorate, __metadata, __param } from "tslib";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import Swal from 'sweetalert2';
import { sys_user_service } from '../../service/sys_user.service';
import { sys_chuc_vu_model } from '@/app/model/sys_chuc_vu.model';
import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
let reset_password_popupComponent = class reset_password_popupComponent {
    http;
    sys_chuc_vu_service;
    dialog;
    sys_giang_vien_service;
    sys_user_service;
    dialogRef;
    data;
    sys_chuc_vu_model = new sys_chuc_vu_model();
    lst_status = [];
    check_error = [];
    pass_old = '';
    pass_new = '';
    pass_new_reset = '';
    hide = true;
    hide1 = true;
    hide2 = true;
    constructor(http, sys_chuc_vu_service, dialog, sys_giang_vien_service, sys_user_service, dialogRef, data) {
        this.http = http;
        this.sys_chuc_vu_service = sys_chuc_vu_service;
        this.dialog = dialog;
        this.sys_giang_vien_service = sys_giang_vien_service;
        this.sys_user_service = sys_user_service;
        this.dialogRef = dialogRef;
        this.data = data;
        this.submit();
    }
    Close() {
        this.dialogRef.close();
    }
    submit() {
        this.sys_giang_vien_service
            .reset_pass(this.pass_old, this.pass_new, this.pass_new_reset)
            .subscribe((result) => {
            this.check_error = result;
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
            else
                Swal.fire({
                    icon: 'warning',
                    title: 'Thất bại',
                    showConfirmButton: false,
                    timer: 2000,
                }).then((result) => {
                });
        });
    }
    ngOnInit() {
    }
};
reset_password_popupComponent = __decorate([
    Component({
        selector: 'Doi_Mat_Khau_popup',
        templateUrl: './popupAdd.component.html',
        styleUrls: ['./popupAdd.component.scss'],
    }),
    __param(6, Inject(MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [HttpClient,
        sys_chuc_vu_service,
        MatDialog,
        sys_giang_vien_service,
        sys_user_service,
        MatDialogRef,
        sys_chuc_vu_model])
], reset_password_popupComponent);
export { reset_password_popupComponent };
//# sourceMappingURL=popupAdd.component.js.map