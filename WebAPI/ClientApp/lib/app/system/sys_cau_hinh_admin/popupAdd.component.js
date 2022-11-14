import { __decorate, __metadata, __param } from "tslib";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HttpClient, HttpEventType, } from '@angular/common/http';
import { sys_cau_hinh_admin_service } from '../../service/sys_cau_hinh_admin.service';
import Swal from 'sweetalert2';
import { sys_cau_hinh_admin_model } from '@/app/model/sys_cau_hinh_admin.model';
import { sys_user_service } from '../../service/sys_user.service';
import { environment } from '@/environments/environment';
let sys_cau_hinh_admin_popupComponent = class sys_cau_hinh_admin_popupComponent {
    http;
    sys_cau_hinh_admin_service;
    dialog;
    sys_user_service;
    dialogRef;
    data;
    sys_cau_hinh_admin_model = new sys_cau_hinh_admin_model();
    lst_status = [];
    check_error = [];
    id_user;
    REST_API_URL = environment.api;
    progress;
    message;
    constructor(http, sys_cau_hinh_admin_service, dialog, sys_user_service, dialogRef, data) {
        this.http = http;
        this.sys_cau_hinh_admin_service = sys_cau_hinh_admin_service;
        this.dialog = dialog;
        this.sys_user_service = sys_user_service;
        this.dialogRef = dialogRef;
        this.data = data;
        this.sys_cau_hinh_admin_model = data;
        this.get_profile_user();
    }
    createImgPath(serverPath) {
        return this.REST_API_URL + `/${serverPath}`;
    }
    uploadFinished = (event) => {
        debugger;
        this.sys_cau_hinh_admin_model.db.image = event;
    };
    uploadFile = (files) => {
        if (files.length === 0) {
            return;
        }
        debugger;
        let fileToUpload = files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        this.http
            .post(this.REST_API_URL + '/sys_cau_hinh_admin/Upload', formData, {
            reportProgress: true,
            observe: 'events',
        })
            .subscribe({
            next: (event) => {
                if (event.type === HttpEventType.UploadProgress)
                    this.progress = Math.round((100 * event.loaded) / event.total);
                else if (event.type === HttpEventType.Response) {
                    this.message = 'Upload success.';
                }
            },
            error: (err) => console.log(err),
        });
    };
    get_profile_user() {
        this.sys_user_service.get_profile_user().subscribe((res) => {
            this.id_user = res.id;
            if (this.sys_cau_hinh_admin_model.db.id == 0) {
                this.Save();
                this.sys_cau_hinh_admin_model.db.create_by = this.id_user;
            }
            else {
                this.sys_cau_hinh_admin_model.db.update_by = this.id_user;
            }
        }, (err) => {
            console.log(err);
        });
    }
    Close() {
        this.dialogRef.close();
    }
    Save() {
        this.sys_cau_hinh_admin_service
            .add(this.sys_cau_hinh_admin_model)
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
        this.sys_cau_hinh_admin_service
            .edit(this.sys_cau_hinh_admin_model)
            .subscribe((result) => {
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
sys_cau_hinh_admin_popupComponent = __decorate([
    Component({
        selector: 'sys_cau_hinh_admin_popup',
        templateUrl: './popupAdd.component.html',
        styleUrls: ['./popupAdd.component.scss'],
    }),
    __param(5, Inject(MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [HttpClient,
        sys_cau_hinh_admin_service,
        MatDialog,
        sys_user_service,
        MatDialogRef,
        sys_cau_hinh_admin_model])
], sys_cau_hinh_admin_popupComponent);
export { sys_cau_hinh_admin_popupComponent };
//# sourceMappingURL=popupAdd.component.js.map