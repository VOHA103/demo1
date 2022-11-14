import { __decorate, __metadata } from "tslib";
import { sys_user_service } from '../../service/sys_user.service';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@/app/database/user.data';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
let login_indexComponent = class login_indexComponent {
    http;
    router;
    sys_user_service;
    dialog;
    user = new User;
    name = '';
    pass = '';
    hide = true;
    constructor(http, router, sys_user_service, dialog) {
        this.http = http;
        this.router = router;
        this.sys_user_service = sys_user_service;
        this.dialog = dialog;
    }
    submit() {
        this.user.name = this.name;
        this.user.pass = this.pass;
        console.log(this.user);
        this.sys_user_service.login(this.user).subscribe((result) => {
            localStorage.setItem('token', result.token);
            this.router.navigateByUrl('/home');
        });
        (err) => {
            if (err.status == 400)
                Swal.fire({
                    icon: 'success',
                    title: 'Authentication failed.',
                    showConfirmButton: false,
                    timer: 2000,
                }).then((result) => { });
            else
                console.log(err);
        };
    }
    ngOnInit() {
        if (localStorage.getItem('token') != null)
            this.router.navigateByUrl('/home');
    }
};
login_indexComponent = __decorate([
    Component({
        selector: 'login_index',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss'],
    }),
    __metadata("design:paramtypes", [HttpClient,
        Router,
        sys_user_service,
        MatDialog])
], login_indexComponent);
export { login_indexComponent };
//# sourceMappingURL=login.component.js.map