import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCop' // currencyCop: 'Locale' -> 'es'
})
export class CurrencyCopPipe implements PipeTransform {

  transform(value: number | string, locale?: string): string {
    return '$ ' + new Intl.NumberFormat(locale).format(Number(value));
  }

}
