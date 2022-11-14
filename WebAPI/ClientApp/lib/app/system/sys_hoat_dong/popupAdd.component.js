import { __decorate, __metadata, __param } from "tslib";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sys_hoat_dong_service } from '../../service/sys_hoat_dong.service';
import Swal from 'sweetalert2';
import { sys_hoat_dong_model } from '../../model/sys_hoat_dong.model';
let sys_hoat_dong_popupComponent = class sys_hoat_dong_popupComponent {
    http;
    dialog;
    sys_hoat_dong_service;
    dialogRef;
    data;
    sys_hoat_dong_model = new sys_hoat_dong_model();
    lst_status = [];
    check_error = [];
    id_hoat_dong;
    constructor(http, dialog, sys_hoat_dong_service, dialogRef, data) {
        this.http = http;
        this.dialog = dialog;
        this.sys_hoat_dong_service = sys_hoat_dong_service;
        this.dialogRef = dialogRef;
        this.data = data;
        this.sys_hoat_dong_model = data;
        if (this.sys_hoat_dong_model.db.id == 0)
            this.Save();
    }
    Close() {
        this.dialogRef.close();
    }
    Save() {
        this.sys_hoat_dong_service.add(this.sys_hoat_dong_model).subscribe((result) => {
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
        this.sys_hoat_dong_service.edit(this.sys_hoat_dong_model).subscribe((result) => {
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
sys_hoat_dong_popupComponent = __decorate([
    Component({
        selector: 'sys_hoat_dong_popup',
        templateUrl: './popupAdd.component.html',
        styleUrls: ['./popupAdd.component.scss'],
    }),
    __param(4, Inject(MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [HttpClient,
        MatDialog,
        sys_hoat_dong_service,
        MatDialogRef,
        sys_hoat_dong_model])
], sys_hoat_dong_popupComponent);
export { sys_hoat_dong_popupComponent };
//# sourceMappingURL=popupAdd.component.js.map