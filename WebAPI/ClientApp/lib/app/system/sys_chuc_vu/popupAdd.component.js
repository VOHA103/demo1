import { __decorate, __metadata, __param } from "tslib";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import Swal from 'sweetalert2';
import { sys_user_service } from '../../service/sys_user.service';
import { sys_chuc_vu_model } from '@/app/model/sys_chuc_vu.model';
let sys_chuc_vu_popupComponent = class sys_chuc_vu_popupComponent {
    http;
    sys_chuc_vu_service;
    dialog;
    sys_user_service;
    dialogRef;
    data;
    sys_chuc_vu_model = new sys_chuc_vu_model();
    lst_status = [];
    check_error = [];
    constructor(http, sys_chuc_vu_service, dialog, sys_user_service, dialogRef, data) {
        this.http = http;
        this.sys_chuc_vu_service = sys_chuc_vu_service;
        this.dialog = dialog;
        this.sys_user_service = sys_user_service;
        this.dialogRef = dialogRef;
        this.data = data;
        //this.sys_chuc_vu = data;
        this.sys_chuc_vu_model = data;
        if (this.sys_chuc_vu_model.db.id == 0)
            this.Save();
    }
    Close() {
        this.dialogRef.close();
    }
    Save() {
        this.sys_chuc_vu_service.add(this.sys_chuc_vu_model).subscribe((result) => {
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
        this.sys_chuc_vu_service
            .edit(this.sys_chuc_vu_model)
            .subscribe((result) => {
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
                name: 'Đang sử dụng',
            },
            {
                id: '2',
                name: 'Ngưng sử dụng',
            },
        ];
    }
};
sys_chuc_vu_popupComponent = __decorate([
    Component({
        selector: 'sys_chuc_vu_popup',
        templateUrl: './popupAdd.component.html',
        styleUrls: ['./popupAdd.component.scss'],
    }),
    __param(5, Inject(MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [HttpClient,
        sys_chuc_vu_service,
        MatDialog,
        sys_user_service,
        MatDialogRef,
        sys_chuc_vu_model])
], sys_chuc_vu_popupComponent);
export { sys_chuc_vu_popupComponent };
//# sourceMappingURL=popupAdd.component.js.map