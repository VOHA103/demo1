import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { utils as XLSXUtils, writeFile } from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx/types';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
@Injectable({
  providedIn: 'root',
})
export class ExcelServicesService {
  constructor() {}
  fileExtension = '.xlsx';
  public exportAsExcel({
    data,
    filename,
    SheetName = 'Data',
    header = [],
    table,
  }): void {
    let wb: WorkBook;
    if (table) {
      wb = XLSXUtils.table_to_book(table);
    } else {
      const ws: WorkSheet = XLSXUtils.json_to_sheet(data, { header });
      wb = XLSXUtils.book_new();
      XLSXUtils.book_append_sheet(wb, ws, SheetName);
    }
    writeFile(wb, `${filename}${this.fileExtension}`);
  }
}
