import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actionTranslation'
})
export class ActionTranslationPipe implements PipeTransform {

  transform(value: string): string {
    let result: any;

    if (value === "INSERT") {
      result = "Oprettet"
    } else if (value === "UPDATE") {
      result = "Opdateret"
    }

    return result;
  }

}
