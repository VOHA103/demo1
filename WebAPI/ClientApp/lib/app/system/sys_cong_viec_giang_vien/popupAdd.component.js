import { __decorate, __metadata, __param } from "tslib";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sys_cong_viec_giang_vien_service } from '../../service/sys_cong_viec_giang_vien.service';
import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
import { sys_cong_viec_service } from '../../service/sys_cong_viec.service';
import { sys_chuc_vu_service } from '../../service/sys_chuc_vu.service';
import { sys_khoa_service } from '../../service/sys_khoa.service';
import { sys_bo_mon_service } from '../../service/sys_bo_mon.service';
import Swal from 'sweetalert2';
import { sys_cong_viec_giang_vien_model } from '@/app/model/sys_cong_viec_giang_vien.model';
let sys_cong_viec_giang_vien_popupComponent = class sys_cong_viec_giang_vien_popupComponent {
    http;
    sys_cong_viec_giang_vien_service;
    sys_giang_vien_service;
    sys_cong_viec_service;
    sys_chuc_vu_service;
    sys_khoa_service;
    sys_bo_mon_service;
    dialog;
    dialogRef;
    data;
    sys_cong_viec_giang_vien_model = new sys_cong_viec_giang_vien_model();
    lst_status = [];
    list_giang_vien;
    list_cong_viec;
    check_error = [];
    lst_khoa = [];
    lst_chuc_vu = [];
    lst_bo_mon = [];
    constructor(http, sys_cong_viec_giang_vien_service, sys_giang_vien_service, sys_cong_viec_service, sys_chuc_vu_service, sys_khoa_service, sys_bo_mon_service, dialog, dialogRef, data) {
        this.http = http;
        this.sys_cong_viec_giang_vien_service = sys_cong_viec_giang_vien_service;
        this.sys_giang_vien_service = sys_giang_vien_service;
        this.sys_cong_viec_service = sys_cong_viec_service;
        this.sys_chuc_vu_service = sys_chuc_vu_service;
        this.sys_khoa_service = sys_khoa_service;
        this.sys_bo_mon_service = sys_bo_mon_service;
        this.dialog = dialog;
        this.dialogRef = dialogRef;
        this.data = data;
        //this.sys_cong_viec_giang_vien = data;
        this.sys_cong_viec_giang_vien_model = data;
        if (this.sys_cong_viec_giang_vien_model.db.id == '0')
            this.Save();
        this.get_list_chuc_vu();
        this.get_list_khoa();
        this.get_list_bo_mon();
    }
    Close() {
        this.dialogRef.close();
    }
    Save() {
        this.sys_cong_viec_giang_vien_service
            .add(this.sys_cong_viec_giang_vien_model)
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
        this.sys_cong_viec_giang_vien_service
            .edit(this.sys_cong_viec_giang_vien_model)
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
    get_list_giang_vien(id_chuc_vu, id_khoa) {
        this.sys_giang_vien_service.get_list_giang_vien_change(id_chuc_vu, id_khoa).subscribe((result) => {
            this.list_giang_vien = result;
            console.log(this.list_giang_vien);
        });
    }
    get_list_cong_viec() {
        this.sys_cong_viec_service.get_list_cong_viec().subscribe((result) => {
            this.list_cong_viec = result;
            console.log(this.list_cong_viec);
        });
    }
    get_list_khoa() {
        this.sys_khoa_service
            .get_list_khoa()
            .subscribe((data) => {
            this.lst_khoa = data;
            this.sys_cong_viec_giang_vien_model.db.id_khoa = this.lst_khoa[0].id;
        });
    }
    get_list_bo_mon() {
        this.sys_bo_mon_service
            .get_list_bo_mon()
            .subscribe((data) => (this.lst_bo_mon = data));
    }
    get_list_chuc_vu() {
        this.sys_chuc_vu_service
            .get_list_chuc_vu()
            .subscribe((data) => {
            this.lst_chuc_vu = data;
            this.sys_cong_viec_giang_vien_model.db.id_chuc_vu = this.lst_chuc_vu[0].id;
            this.get_list_giang_vien(this.sys_cong_viec_giang_vien_model.db.id_chuc_vu, this.sys_cong_viec_giang_vien_model.db.id_khoa);
        });
    }
    ngOnInit() {
        this.get_list_cong_viec();
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
sys_cong_viec_giang_vien_popupComponent = __decorate([
    Component({
        selector: 'sys_cong_viec_giang_vien_popup',
        templateUrl: './popupAdd.component.html',
        styleUrls: ['./popupAdd.component.scss'],
    }),
    __param(9, Inject(MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [HttpClient,
        sys_cong_viec_giang_vien_service,
        sys_giang_vien_service,
        sys_cong_viec_service,
        sys_chuc_vu_service,
        sys_khoa_service,
        sys_bo_mon_service,
        MatDialog,
        MatDialogRef,
        sys_cong_viec_giang_vien_model])
], sys_cong_viec_giang_vien_popupComponent);
export { sys_cong_viec_giang_vien_popupComponent };
//# sourceMappingURL=popupAdd.component.js.map