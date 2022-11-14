import { __decorate, __metadata, __param } from "tslib";
import { sys_phong_truc_model } from '../../model/sys_phong_truc.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sys_phong_truc_service } from '../../service/sys_phong_truc.service';
import Swal from 'sweetalert2';
let sys_phong_truc_popupComponent = class sys_phong_truc_popupComponent {
    http;
    sys_phong_truc_service;
    dialog;
    dialogRef;
    data;
    sys_phong_truc_model = new sys_phong_truc_model();
    lst_status = [];
    check_error = [];
    constructor(http, sys_phong_truc_service, dialog, dialogRef, data) {
        this.http = http;
        this.sys_phong_truc_service = sys_phong_truc_service;
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        //this.sys_phong_truc = data;
        this.sys_phong_truc_model = data;
        if (this.sys_phong_truc_model.db.id == 0)
            this.Save();
    }
    Close() {
        this.dialogRef.close();
    }
    Save() {
        this.sys_phong_truc_service
            .add(this.sys_phong_truc_model)
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
        this.sys_phong_truc_service.edit(this.sys_phong_truc_model).subscribe((result) => {
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
sys_phong_truc_popupComponent = __decorate([
    Component({
        selector: 'sys_phong_truc_popup',
        templateUrl: './popupAdd.component.html',
        styleUrls: ['./popupAdd.component.scss'],
    }),
    __param(4, Inject(MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [HttpClient,
        sys_phong_truc_service,
        MatDialog,
        MatDialogRef,
        sys_phong_truc_model])
], sys_phong_truc_popupComponent);
export { sys_phong_truc_popupComponent };
//# sourceMappingURL=popupAdd.component.js.map