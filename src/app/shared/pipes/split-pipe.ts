import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value: string, count: number): string {
    return value.split(' ', count).join(' ');
  }
}
