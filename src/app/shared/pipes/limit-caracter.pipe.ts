import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitCaracter',
  standalone: true
})
export class LimitCaracterPipe implements PipeTransform {
  transform(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }
}
