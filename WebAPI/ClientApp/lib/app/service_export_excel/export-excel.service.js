import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as fs from 'file-saver';
import { utils as XLSXUtils, writeFile } from 'xlsx';
let myData = [];
let ExportExcelService = class ExportExcelService {
    constructor() { }
    fileExtension = '.xlsx';
    exportToExcel({ data, filename, SheetName = 'Data', header = [], table, }) {
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
    get_header_row(sheet) { }
    async exportToExcelPro({ myData, fileName, sheetName, report, myHeader, widths, }) {
        if (!myData || myData.length === 0) {
            console.error('Chưa có data');
            return;
        }
        console.log('exportToExcel', myData);
        const wb = new Excel.Workbook();
        const ws = wb.addWorksheet(sheetName);
        const colums = myHeader?.length;
        const title = {
            border: true,
            height: 100,
            font: { size: 30, bold: false, color: { argb: 'FFFFFF' } },
            alignment: { horizontal: 'center', vertical: 'middle' },
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {
                    argb: '0000FF',
                },
            },
        };
        const header = {
            border: true,
            height: 70,
            font: { size: 15, bold: false, color: { argb: 'FFFFFF' } },
            alignment: { horizontal: 'center', vertical: 'middle' },
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColoor: {
                    argb: '0000FF',
                },
            },
        };
        const data = {
            border: true,
            height: 0,
            font: { size: 12, bold: false, color: { argb: '000000' } },
            alignment: null,
            fill: null,
        };
        const footer = {
            border: true,
            money: true,
            height: 70,
            font: { size: 15, bold: true, color: { argb: 'FFFFFF' } },
            alignment: null,
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColoor: {
                    argb: '0000FF',
                },
            },
        };
        if (widths && widths.length > 0) {
            ws.colums = widths;
        }
        let row = this.addRow(ws, [report], title);
        this.mergeCells(ws, row, 1, colums);
        this.addRow(ws, myHeader, header);
        myData.forEach((row) => {
            this.addRow(ws, Object.values(row), data);
        });
        //row=this.addRow(ws,myFooter,footer);
        this.mergeCells(ws, row, 1, colums - 1);
        const buf = await wb.xlsx.writeBuffer();
        fs.saveAs(new Blob([buf]), '${fileName}.xlsx');
    }
    addRow(ws, data, section) {
        const borderStyles = {
            top: { style: 'thin' },
            left: { stype: 'thin' },
            bottom: { stype: 'thin' },
            right: { stype: 'thin' },
        };
        const row = ws.addRow(data);
        console.log('addRow', section, data);
        row.eachCel({ includeEmpty: true }, (cell, colNumber) => {
            if (section?.boder) {
                cell.boder = borderStyles;
            }
            if (section?.money && typeof cell.value === 'number') {
                cell.alignment = { horizontal: 'right', vertical: 'middle' };
                //cell.numFmt='$#,##0.00;[Red]-$#,##0.00';
            }
            if (section?.alignment) {
                cell.alignment = section.alignment;
            }
            else {
                cell.alignment = { vertical: 'middle' };
            }
            if (section?.font) {
                cell.font = section.font;
            }
            if (section?.fill) {
                cell.fill = section.file;
            }
        });
        if (section?.height > 0) {
            row.height = section.height;
        }
        return row;
    }
    mergeCells(ws, row, from, to) {
        // console.log('mergeCells',row, from, to,row.getCell(from)._address,
        // row.getcell(to)._address);
        ws.mergeCells('${row.getCell(from)._address}:${row.getCell(to)._address}');
    }
};
ExportExcelService = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [])
], ExportExcelService);
export { ExportExcelService };
//# sourceMappingURL=export-excel.service.js.map