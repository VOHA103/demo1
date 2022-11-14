import { __decorate, __metadata } from "tslib";
import { sys_giang_vien_service } from '../../service/sys_giang_vien.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { sys_giang_vien_popupComponent } from '@/app/system/sys_giang_vien/popupAdd.component';
import { reset_password_popupComponent } from '../reset_password/popupAdd.component';
let user_menuComponent = class user_menuComponent {
    http;
    router;
    sys_giang_vien_service;
    dialog;
    user_name;
    constructor(http, router, sys_giang_vien_service, dialog) {
        this.http = http;
        this.router = router;
        this.sys_giang_vien_service = sys_giang_vien_service;
        this.dialog = dialog;
    }
    onLogout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
    get_user_login() {
        this.sys_giang_vien_service.get_user_login().subscribe((result) => {
            debugger;
            const dialogRef = this.dialog.open(sys_giang_vien_popupComponent, {
                width: '850px',
                data: result,
            });
            dialogRef.afterClosed().subscribe((result) => { });
        });
    }
    go_to_popup_reset_password() {
        const dialogRef = this.dialog.open(reset_password_popupComponent, {
            width: '850px',
        });
        dialogRef.afterClosed().subscribe((result) => { });
    }
    ngOnInit() { }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], user_menuComponent.prototype, "user_name", void 0);
user_menuComponent = __decorate([
    Component({
        selector: 'user_menu',
        templateUrl: './user_menu.component.html',
        styleUrls: ['./user_menu.component.scss'],
    }),
    __metadata("design:paramtypes", [HttpClient,
        Router,
        sys_giang_vien_service,
        MatDialog])
], user_menuComponent);
export { user_menuComponent };
//# sourceMappingURL=user_menu.component.js.map