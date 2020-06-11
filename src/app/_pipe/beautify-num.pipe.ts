import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'beautifyNum'
})
export class BeautifyNumPipe implements PipeTransform {

  transform(value: number) {
    const res = parseFloat(String(value));
    if (Number.isNaN(res)) {
      return undefined;
    }
    return '€ ' + res.toFixed(2);
  }
}
