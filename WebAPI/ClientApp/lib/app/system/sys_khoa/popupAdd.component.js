import { __decorate, __metadata, __param } from "tslib";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sys_khoa_service } from '../../service/sys_khoa.service';
import { sys_user_service } from '../../service/sys_user.service';
import Swal from 'sweetalert2';
import { sys_khoa_model } from '../../model/sys_khoa.model';
let sys_khoa_popupComponent = class sys_khoa_popupComponent {
    http;
    sys_khoa_service;
    dialog;
    sys_user_service;
    dialogRef;
    data;
    sys_khoa_model = new sys_khoa_model();
    lst_status = [];
    check_error = [];
    id_user;
    constructor(http, sys_khoa_service, dialog, sys_user_service, dialogRef, data) {
        this.http = http;
        this.sys_khoa_service = sys_khoa_service;
        this.dialog = dialog;
        this.sys_user_service = sys_user_service;
        this.dialogRef = dialogRef;
        this.data = data;
        this.sys_khoa_model = data;
        this.get_profile_user();
    }
    get_profile_user() {
        this.sys_user_service.get_profile_user().subscribe((res) => {
            this.id_user = res.id;
            debugger;
            if (this.sys_khoa_model.db.id == 0) {
                this.Save();
                this.sys_khoa_model.db.create_by = this.id_user;
            }
            else {
                this.sys_khoa_model.db.update_by = this.id_user;
            }
        }, err => {
            console.log(err);
        });
    }
    Close() {
        this.dialogRef.close();
    }
    Save() {
        this.sys_khoa_service.add(this.sys_khoa_model).subscribe((result) => {
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
        debugger;
        this.sys_khoa_service.edit(this.sys_khoa_model).subscribe((result) => {
            this.Close();
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                showConfirmButton: false,
                timer: 2000,
            }).then((result) => { });
        });
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
sys_khoa_popupComponent = __decorate([
    Component({
        selector: 'sys_khoa_popup',
        templateUrl: './popupAdd.component.html',
        styleUrls: ['./popupAdd.component.scss'],
    }),
    __param(5, Inject(MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [HttpClient,
        sys_khoa_service,
        MatDialog,
        sys_user_service,
        MatDialogRef,
        sys_khoa_model])
], sys_khoa_popupComponent);
export { sys_khoa_popupComponent };
//# sourceMappingURL=popupAdd.component.js.map