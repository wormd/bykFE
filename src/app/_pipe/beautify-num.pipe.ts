import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beautifyNum'
})
export class BeautifyNumPipe implements PipeTransform {

  transform(value: number) {
    return parseFloat(String(value)).toFixed(2);
  }
}
