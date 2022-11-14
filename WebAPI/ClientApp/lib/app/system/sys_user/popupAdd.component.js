import { __decorate, __metadata, __param } from "tslib";
import { user_model } from '../../model/user.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sys_user_service } from '../../service/sys_user.service';
import Swal from 'sweetalert2';
let sys_user_popupComponent = class sys_user_popupComponent {
    http;
    sys_user_service;
    dialog;
    dialogRef;
    data;
    user_model = new user_model();
    lst_status = [];
    check_error = [];
    constructor(http, sys_user_service, dialog, dialogRef, data) {
        this.http = http;
        this.sys_user_service = sys_user_service;
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        //this.user = data;
        this.user_model = data;
        if (this.user_model.db.id == '0')
            this.Save();
    }
    Close() {
        this.dialogRef.close();
    }
    Save() {
        this.sys_user_service.addUser(this.user_model).subscribe((result) => {
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
        console.log(this.user_model);
    }
    Edit() {
        this.sys_user_service.editUser(this.user_model).subscribe((result) => {
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                showConfirmButton: false,
                timer: 2000,
            }).then((result) => {
                this.Close();
            });
        });
        console.log(this.user_model);
    }
    ngOnInit() {
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
sys_user_popupComponent = __decorate([
    Component({
        selector: 'sys_user_popup',
        templateUrl: './popupAdd.component.html',
        styleUrls: ['./popupAdd.component.scss'],
    }),
    __param(4, Inject(MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [HttpClient,
        sys_user_service,
        MatDialog,
        MatDialogRef,
        user_model])
], sys_user_popupComponent);
export { sys_user_popupComponent };
//# sourceMappingURL=popupAdd.component.js.map