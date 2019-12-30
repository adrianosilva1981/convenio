import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[], options: XLSX.JSON2SheetOpts, excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, options);
    let elem: any;

    for (elem in worksheet) {
      if (worksheet[elem]['t'] === 's' && worksheet[elem]['v'].startsWith('#:')) {
        worksheet[elem]['f'] = worksheet[elem]['v'].replace('#:', '');
      }
    }

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  public importExcelFile(evt) {
    return new Promise((resolve, reject) => {
      const target: DataTransfer = <DataTransfer>(evt.target);

      if (target.files.length !== 1) {
        reject(false);
      }

      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        const wsname: string = wb.SheetNames[0]; // Primeira aba
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        resolve(<any>(XLSX.utils.sheet_to_json(ws, { header: 1 })));
      };

      reader.readAsBinaryString(target.files[0]);
    });
  }

  ////////////////////////////////////// FUNÇÕES PRIVADAS ////////////////////////////////////////

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
