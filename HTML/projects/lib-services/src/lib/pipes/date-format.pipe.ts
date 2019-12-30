import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../services/common.service';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  constructor(
    private _commonService: CommonService,
  ) {}

  transform(value: any, datetime: boolean = false): any {
    return this._commonService.formatDate(value, datetime);
  }
}
