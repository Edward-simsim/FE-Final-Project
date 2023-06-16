import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'SQL';
      case 2:
        return 'C++';
      case 3:
        return 'FrontEnd';
      default:
        return 'Unknown';
    }
  }
}
