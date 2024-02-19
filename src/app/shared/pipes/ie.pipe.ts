import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ie',
  standalone: true
})

export class IePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');
  }
}
