import { __decorate, __metadata } from "tslib";
import { Component, Output, EventEmitter, Input } from '@angular/core';
let PaginationComponent = class PaginationComponent {
    page;
    count;
    perPage;
    pagesToShow;
    loading;
    goPrev = new EventEmitter();
    goNext = new EventEmitter();
    goPage = new EventEmitter();
    constructor() { }
    ngOnInit() {
    }
    onPrev() {
        this.goPrev.emit(true);
    }
    onNext() {
        this.goNext.emit(true);
    }
    onPage(n) {
        this.goPage.emit(n);
    }
    totalPages() {
        return Math.ceil(this.count / this.perPage) || 0;
    }
    isLastPage() {
        return this.perPage * this.page >= this.count;
    }
    getMin() {
        return ((this.perPage * this.page) - this.perPage) + 1;
    }
    getMax() {
        let max = this.perPage * this.page;
        if (max > this.count) {
            max = this.count;
        }
        return max;
    }
    getPages() {
        const totalPages = Math.ceil(this.count / this.perPage);
        const thisPage = this.page || 1;
        const pagesToShow = this.pagesToShow || 9;
        const pages = [];
        pages.push(thisPage);
        console.log('Starting loop with: total pages:', totalPages, 'thisPage:', thisPage, 'pagesToShow:', pagesToShow);
        for (let i = 0; i < pagesToShow - 1; i++) {
            console.log('pages[]:', pages);
            if (pages.length < pagesToShow) {
                if (Math.min.apply(null, pages) > 1) {
                    pages.push(Math.min.apply(null, pages) - 1);
                    console.log('pushing', Math.min.apply(null, pages) - 1, 'onto array');
                }
            }
            if (pages.length < pagesToShow) {
                if (Math.max.apply(null, pages) < totalPages) {
                    pages.push(Math.max.apply(null, pages) + 1);
                    console.log('pushing', Math.max.apply(null, pages) + 1, 'onto array');
                }
            }
        }
        pages.sort((a, b) => a - b);
        return pages;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "page", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "count", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "perPage", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], PaginationComponent.prototype, "pagesToShow", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], PaginationComponent.prototype, "loading", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "goPrev", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "goNext", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "goPage", void 0);
PaginationComponent = __decorate([
    Component({
        selector: 'app-pagination',
        templateUrl: './pagination.component.html',
        styleUrls: ['./pagination.component.css']
    }),
    __metadata("design:paramtypes", [])
], PaginationComponent);
export { PaginationComponent };
//# sourceMappingURL=pagination.component.js.map