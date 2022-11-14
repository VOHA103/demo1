import { __decorate, __metadata } from "tslib";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
let AuthInterceptor = class AuthInterceptor {
    router;
    constructor(router) {
        this.router = router;
    }
    intercept(req, next) {
        if (localStorage.getItem('token') != null) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            });
            return next.handle(clonedReq).pipe(tap(succ => { }, err => {
                if (err.status == 401) {
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('/login');
                }
            }));
        }
        else
            return next.handle(req.clone());
    }
};
AuthInterceptor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Router])
], AuthInterceptor);
export { AuthInterceptor };
//# sourceMappingURL=auth.interceptor.js.map