import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(s: string): string {
    let ret: string = "";
    let start: boolean = true;
    for (let c of s) {
      if (c == '_') {
        start = true;
        ret += ' ';
        continue;
      }
      if (start) {
        ret += c.toUpperCase();
        start = false;
      } else {
        ret += c;
      }
    }
    return ret;
  }

}
