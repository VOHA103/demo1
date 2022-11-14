import { __decorate, __metadata, __param } from "tslib";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sys_loai_cong_viec_service } from '../../service/sys_loai_cong_viec.service';
import Swal from 'sweetalert2';
import { sys_loai_cong_viec_model } from '@/app/model/sys_loai_cong_viec.model';
let sys_loai_cong_viec_popupComponent = class sys_loai_cong_viec_popupComponent {
    http;
    sys_loai_cong_viec_service;
    dialog;
    dialogRef;
    data;
    sys_loai_cong_viec_model = new sys_loai_cong_viec_model();
    lst_status = [];
    lst_loai = [];
    check_error = [];
    constructor(http, sys_loai_cong_viec_service, dialog, dialogRef, data) {
        this.http = http;
        this.sys_loai_cong_viec_service = sys_loai_cong_viec_service;
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        //this.sys_loai_cong_viec_model = data;
        this.sys_loai_cong_viec_model = data;
        if (this.sys_loai_cong_viec_model.db.id == 0)
            this.Save();
    }
    Close() {
        this.dialogRef.close();
    }
    Save() {
        this.sys_loai_cong_viec_service
            .add(this.sys_loai_cong_viec_model)
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
    Edit() {
        this.sys_loai_cong_viec_service
            .edit(this.sys_loai_cong_viec_model)
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
        this.lst_loai = [
            {
                id: 1,
                name: 'Cá nhân',
            },
            {
                id: 2,
                name: 'Tập thể',
            },
        ];
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
sys_loai_cong_viec_popupComponent = __decorate([
    Component({
        selector: 'sys_loai_cong_viec_popup',
        templateUrl: './popupAdd.component.html',
        styleUrls: ['./popupAdd.component.scss'],
    }),
    __param(4, Inject(MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [HttpClient,
        sys_loai_cong_viec_service,
        MatDialog,
        MatDialogRef,
        sys_loai_cong_viec_model])
], sys_loai_cong_viec_popupComponent);
export { sys_loai_cong_viec_popupComponent };
//# sourceMappingURL=popupAdd.component.js.map