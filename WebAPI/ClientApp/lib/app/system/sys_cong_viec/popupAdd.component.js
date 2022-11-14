import { __decorate, __metadata, __param } from "tslib";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sys_cong_viec_service } from '../../service/sys_cong_viec.service';
import Swal from 'sweetalert2';
import { sys_cong_viec_model } from '@/app/model/sys_cong_viec.model';
import { sys_loai_cong_viec_service } from '../../service/sys_loai_cong_viec.service';
let sys_cong_viec_popupComponent = class sys_cong_viec_popupComponent {
    http;
    sys_cong_viec_service;
    sys_loai_cong_viec_service;
    dialog;
    dialogRef;
    data;
    sys_cong_viec_model = new sys_cong_viec_model();
    lst_status = [];
    check_error = [];
    lst_loai = [];
    lst_gio = [];
    lst_phut = [];
    list_loai_cong_viec = [];
    constructor(http, sys_cong_viec_service, sys_loai_cong_viec_service, dialog, dialogRef, data) {
        this.http = http;
        this.sys_cong_viec_service = sys_cong_viec_service;
        this.sys_loai_cong_viec_service = sys_loai_cong_viec_service;
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        //this.user = data;
        this.sys_cong_viec_model = data;
        if (this.sys_cong_viec_model.db.id == '0')
            this.Save();
    }
    get_list_loai_cong_viec() {
        debugger;
        this.sys_loai_cong_viec_service.get_list_use().subscribe((result) => {
            this.list_loai_cong_viec = result;
        });
    }
    Close() {
        this.dialogRef.close();
    }
    Save() {
        this.sys_cong_viec_service
            .add(this.sys_cong_viec_model)
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
        this.sys_cong_viec_service
            .edit(this.sys_cong_viec_model)
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
        this.get_list_loai_cong_viec();
        this.lst_gio = [
            {
                id: '1',
                name: '1',
            },
            {
                id: '2',
                name: '2',
            },
            {
                id: '3',
                name: '3',
            },
            {
                id: '4',
                name: '4',
            },
            {
                id: '5',
                name: '5',
            },
            {
                id: '6',
                name: '6',
            },
            {
                id: '7',
                name: '7',
            },
            {
                id: '8',
                name: '8',
            },
            {
                id: '9',
                name: '9',
            },
            {
                id: '10',
                name: '10',
            },
            {
                id: '11',
                name: '11',
            },
            {
                id: '12',
                name: '12',
            },
            {
                id: '13',
                name: '13',
            },
            {
                id: '14',
                name: '14',
            },
            {
                id: '15',
                name: '15',
            },
            {
                id: '16',
                name: '16',
            },
            {
                id: '17',
                name: '17',
            },
            {
                id: '18',
                name: '18',
            },
            {
                id: '19',
                name: '19',
            },
            {
                id: '20',
                name: '20',
            },
            {
                id: '21',
                name: '21',
            },
            {
                id: '22',
                name: '22',
            },
            {
                id: '23',
                name: '23',
            },
            {
                id: '24',
                name: '24',
            },
        ];
        this.lst_phut = [
            {
                id: '00',
                name: '00',
            },
            {
                id: '15',
                name: '15',
            },
            {
                id: '30',
                name: '30',
            },
            {
                id: '45',
                name: '45',
            },
        ];
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
                name: 'Đang sử dụng',
            },
            {
                id: '2',
                name: 'Ngưng sử dụng',
            },
        ];
    }
};
sys_cong_viec_popupComponent = __decorate([
    Component({
        selector: 'sys_cong_viec_popup',
        templateUrl: './popupAdd.component.html',
        styleUrls: ['./popupAdd.component.scss'],
    }),
    __param(5, Inject(MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [HttpClient,
        sys_cong_viec_service,
        sys_loai_cong_viec_service,
        MatDialog,
        MatDialogRef,
        sys_cong_viec_model])
], sys_cong_viec_popupComponent);
export { sys_cong_viec_popupComponent };
//# sourceMappingURL=popupAdd.component.js.map