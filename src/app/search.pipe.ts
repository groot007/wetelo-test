import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(books, value) {
    return books.filter(book => {
      return book.title.toLowerCase().includes(value.toLowerCase());
    });
  }
}
