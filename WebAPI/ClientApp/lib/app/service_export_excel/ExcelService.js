import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { utils as XLSXUtils, writeFile } from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
let ExcelServicesService = class ExcelServicesService {
    constructor() { }
    fileExtension = '.xlsx';
    exportAsExcel({ data, filename, SheetName = 'Data', header = [], table, }) {
        let wb;
        if (table) {
            wb = XLSXUtils.table_to_book(table);
        }
        else {
            const ws = XLSXUtils.json_to_sheet(data, { header });
            wb = XLSXUtils.book_new();
            XLSXUtils.book_append_sheet(wb, ws, SheetName);
        }
        writeFile(wb, `${filename}${this.fileExtension}`);
    }
};
ExcelServicesService = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [])
], ExcelServicesService);
export { ExcelServicesService };
//# sourceMappingURL=ExcelService.js.map