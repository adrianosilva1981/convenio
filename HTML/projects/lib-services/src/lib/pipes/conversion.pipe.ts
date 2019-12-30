import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversion'
})
export class ConversionPipe implements PipeTransform {

  transform(value: any, format: string, html: boolean = true): string {
    value = Number(value);
    value = value ? value : 0;
    let symbol = '';
    let valueConverted = '';
    let lang = '';
    let result = '';

    switch (format) {
      case 'BRL':
        symbol = 'R$';
        lang = 'pt-BR';
        break;
      case 'USD':
        symbol = '$';
        lang = 'en-US';
        break;
    }

    if (lang !== 'pt-BR' && lang !== 'en-US') {
      symbol = 'R$';
      lang = 'pt-BR';
    }

    valueConverted = value.toLocaleString(lang, { minimumFractionDigits: 2, maximumFractionDigits: 2, currency: format });

    if (html) {
      const arr1 = valueConverted.split('');
      const arr2 = valueConverted.split('');
      const decimal = arr1.splice((arr1.length - 3), 3).join('');
      const value2 = arr2.splice(0, (arr2.length - 3)).join('');

      result = `<span class="formatMoney"><span class="moneySymbol">${symbol}</span> <span class="moneyValue">${value2}</span><span class="moneyDecimal">${decimal}</span></span>`;

    } else {
      result = symbol + ' ' + valueConverted;
    }
    return result;
  }
}
