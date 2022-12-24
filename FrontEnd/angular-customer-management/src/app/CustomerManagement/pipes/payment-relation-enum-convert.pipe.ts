import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentRelationEnumConvert'
})
export class PaymentRelationEnumConvertPipe implements PipeTransform {

  transform(value?: number): string {
    let result: any;
    if (value === 0) {
      result = "Ukendt"
    } else if (value === 1) {
      result = "God"
    } else if (value === 2) {
      result = "Dårlig"
    }
    return result;
  }

}
