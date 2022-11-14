import { __decorate, __metadata } from "tslib";
import { sys_bo_mon_service } from '../../service/sys_bo_mon.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, Output, EventEmitter, } from '@angular/core';
import { HttpClient, HttpEventType, } from '@angular/common/http';
import { environment } from '@/environments/environment';
let UploadImageComponent = class UploadImageComponent {
    http;
    sys_bo_mon_service;
    dialog;
    progress;
    message;
    onUploadFinished = new EventEmitter();
    REST_API_URL = environment.api;
    constructor(http, sys_bo_mon_service, dialog) {
        this.http = http;
        this.sys_bo_mon_service = sys_bo_mon_service;
        this.dialog = dialog;
    }
    uploadFile = (files) => {
        if (files.length === 0) {
            return;
        }
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
                    this.onUploadFinished.emit(event.body);
                    console.log(this.onUploadFinished.emit(event.body));
                }
            },
            error: (err) => console.log(err),
        });
    };
    ngOnInit() { }
};
__decorate([
    Output(),
    __metadata("design:type", Object)
], UploadImageComponent.prototype, "onUploadFinished", void 0);
UploadImageComponent = __decorate([
    Component({
        selector: 'upload_image_index',
        templateUrl: './index.component.html',
        styleUrls: ['./index.component.scss'],
    }),
    __metadata("design:paramtypes", [HttpClient,
        sys_bo_mon_service,
        MatDialog])
], UploadImageComponent);
export { UploadImageComponent };
//# sourceMappingURL=index.component.js.map