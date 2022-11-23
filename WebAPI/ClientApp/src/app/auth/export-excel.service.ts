import { Injectable } from '@angular/core';
import { utils as XLSXUtils, writeFile } from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx/types';
import * as fs from 'file-saver';
import { DatePipe } from '@angular/common';
import * as Excel from 'exceljs/dist/exceljs.min.js';
@Injectable({
  providedIn: 'root',
})
export class ExportExcelService {
  datePipe: any;

  constructor() {}
  fileExtension = '.xlsx';

  public exportExcel({
    data,
    fileName,
    sheetName = 'Data',
    header = [],
    table,
  }): void {
    let wb: WorkBook;
    if (table) {
      wb = XLSXUtils.table_to_book(table);
    } else {
      const ws: WorkSheet = XLSXUtils.json_to_sheet(data, { header });
      wb = XLSXUtils.book_new();
      XLSXUtils.book_append_sheet(wb, ws, sheetName);
    }
    writeFile(wb, `${fileName}${this.fileExtension}`);
  }

  private get_header_row(sheet) {}

  async exportToExcelPro({
    myData,
    fileName,
    sheetName,
    report,
    myHeader,
    widths,
  }) {
    if (!myData || myData.length === 0) {
      console.error('Chưa có data');
      return;
    }
    console.log('exportToExcel', myData);

    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet(sheetName);
    const colums = myHeader?.length;
    // report = ws.addRow([
    //   'Date : ' + this.datePipe.transform(new Date(), 'medium'),
    // ]);
    const data = {
      border: true,
      height: 30,
      font: {
        size: 20,
        bold: false,
      // underline: 'single',
        color: { argb: '000000' },
      },
      alignment: null,
      fill: null,
    };

    const title = {
      border: true,
      height: 70,
      font: {

        family: 4,
        size: 50,
        bold: true,
        align: 'center',
      },
      alignment: { horizontal: 'center', vertical: 'center' },
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
      height: 40,
      font: {
        size: 40,
       // underline: 'double',
        bold: false,
        color: { argb: 'FFFFFF' },
        align: 'center',
      },
      alignment: { horizontal: 'center', vertical: 'center ' },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColoor: {
          argb: '0000FF',
        },
        bgColor: {
          argb: '#FFF0F5',
        },
      },
    };

    // if (widths && widths.length > 0) {
    //   ws.colums = widths;
    // }
    let row = this.addRow(ws, [report], title);
    this.mergeCells(ws, row, 1, colums);

    this.addRow(ws, myHeader, header);

    myData.forEach((row) => {
      this.addRow(ws, Object.values(row), data);
    });
    const buf = await wb.xlsx.writeBuffer();
    fs.saveAs(new Blob([buf]), `${fileName}.xlsx`);
  }

  private addRow(ws, data, section) {
    const borderStyles = {
      top: { style: 'thin' },
      left: { stype: 'thin' },
      bottom: { stype: 'thin' },
      right: { stype: 'thin' },
    };
    const row = ws.addRow(data);

    console.log('addRow', section, data);
    ws.getColumn(1).width = 40;
    ws.getColumn(2).width = 30;
    ws.getColumn(3).width =10;
    ws.getColumn(4).width = 30;
    ws.getColumn(5).width = 30;
    ws.getColumn(6).width = 20;

    // if (section?.boder) {
    //   row.boder = borderStyles;
    // }

    if (section?.alignment) {
      row.alignment = section.alignment;
    } else {
      row.alignment = { vertical: 'middle' };
    }
    // if (section?.font) {
    //   row.font = section.font;
    // }
    // if (section?.fill) {
    //   row.fill = section.file;
    // }
    if (section?.height > 0) {
      row.height = section.height;
    }
    ws.addRow([]);

    return row;
  }

  private mergeCells(ws, row, from, to) {
    ws.mergeCells(`${row.getCell(from)._address}:${row.getCell(to)._address}`);
  }
}
