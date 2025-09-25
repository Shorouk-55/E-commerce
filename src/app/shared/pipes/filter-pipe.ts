import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], word: string): any[] {
    if (!word) return array; // لو مفيش كلمة فلترة، رجع كل العناصر

    word = word.toLowerCase();

    return array.filter(item => {
      const title = item.title?.toLowerCase() ?? '';
      const name = item.name?.toLowerCase() ?? '';
      return title.includes(word) || name.includes(word);
    });
  }

}
