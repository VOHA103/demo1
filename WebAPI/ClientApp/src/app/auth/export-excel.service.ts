import { Injectable } from '@angular/core';
import { utils as XLSXUtils, writeFile } from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx/types';
import * as fs from 'file-saver';
import { DatePipe } from '@angular/common';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import Swal from 'sweetalert2';
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
      Swal.fire({
        icon: 'warning',
        title: 'Chưa có dữ liệu',
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {});
      return;
    }
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet(sheetName);
    const colums = myHeader?.length;

    const data = {
      border: true,
      height: 30,
      font: {
        size: 13,
        bold: false,
      //  color: { argb: '000000' },
      },
      alignment: null,
      // { horizontal: 'center', vertical: 'center' },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        // fgColor: {
        //   argb: '#000000',
        // },
        // bgColor: {
        //   argb: '#FFFFFF',
        // },
      },
    };

    const title = {
      border: true,
      height: 70,
      font: {
        family: 4,
        size: 40,
        bold: true,
      },
      alignment: { horizontal: 'center', vertical: 'middle' },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        // fgColor: {
        //   argb: '0000FF',
        // },
      },
    };

    const header = {
      border: true,
      height: 40,
      font: {
        size: 15,
        bold: true,
       // color: { argb: 'FFFFFF' },
      },
      alignment: { horizontal: 'center', vertical: 'middle ' },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        // fgColor: {
        //   argb: '0000FF',
        // },
        // bgColor: {
        //   argb: '#FFFFFF',
        // },
      },
    };

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
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
    const row = ws.addRow(data);

    ws.getColumn(1).width = 40;
    ws.getColumn(2).width = 30;
    ws.getColumn(3).width = 30;
    ws.getColumn(4).width = 30;
    ws.getColumn(5).width = 30;
    ws.getColumn(6).width = 40;
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (section?.border) {
        cell.border = borderStyles;
      }

      if (section?.alignment) {
        row.alignment = section.alignment;
      } else {
        row.alignment = { vertical: 'middle' };
      }
      if(section?.font){
        cell.font=section.font;
      }
   
    });
    if (section?.height > 0) {
      row.height = section.height;
    }
    return row;
  }
  private mergeCells(ws, row, from, to) {
    ws.mergeCells(`${row.getCell(from)._address}:${row.getCell(to)._address}`);
  }
}
