import {Injectable} from '@angular/core';
import {Book} from './book';
import {UUID} from 'angular2-uuid';


@Injectable()
export class BookListService {

  private bookList: Book[] = [
    {id: '1', title: 'Harry Potter', description: 'Wizard history', state: true},
    {id: '2', title: 'Alice in wonderland', description: 'Fairy Tail', state: true},
    {id: '3', title: 'Don Quixote', description: 'by Miguel de Cervantes', state: false},
    {id: '4', title: 'A Tale of Two Cities', description: 'by Charles Dickens', state: true},
    {id: '5', title: 'The Lord of the Rings', description: 'All about ring', state: true},
    {id: '6', title: 'The Little Prince', description: 'by Antoine de Saint-Exupery', state: true},
    {id: '7', title: 'Harry Potter and the Sorcerer\'s Stone', description: 'by J.K. Rowling', state: true},
    {id: '8', title: 'The Hobbit', description: 'by J.R.R. Tolkien', state: false},
    {id: '9', title: 'She: A History of Adventure', description: 'by H. Rider Haggard', state: true},
    {id: '10', title: 'The Lion, the Witch and the Wardrobe', description: 'by C.S. Lewis', state: false},
    {id: '11', title: 'The Da Vinci Code', description: 'by Dan Brown', state: true},
    {id: '12', title: 'Think and Grow Rich', description: 'by Napoleon Hill', state: true},
    {id: '13', title: 'The Alchemist', description: 'by Paulo Coelho', state: true},
    {id: '14', title: ' Star Wars series', description: 'by various authors', state: true},
    {id: '15', title: 'The Chronicles of Narnia series', description: 'by C.S. Lewis', state: true},
    {id: '16', title: 'The Twilight Saga', description: 'by Stephenie Meyer', state: true},
  ];

  getData(): Book[] {
    return this.bookList;
  }

  getSliceData(start, end) {
    return this.bookList.slice(start, end);
  }

  getBookById(bookId) {
    const idx = this.getIdxEl(bookId);
    return this.bookList[idx];
  }

  getIdxEl(bookId) {
    return this.bookList.findIndex( obj => obj.id === bookId );
  }

  addItem(book: Book) {
    book.id = UUID.UUID();
    this.bookList.push(new Book(book.id, book.title, book.description, book.state));
  }

  removeItem(bookId) {
    const idx = this.getIdxEl(bookId);
    this.bookList.splice(idx, 1);
  }

  updateItem(book: Book) {
    const idx = this.getIdxEl(book.id);
    Object.keys(book).forEach(k => this.bookList[idx][k] = book[k]);
  }

}
