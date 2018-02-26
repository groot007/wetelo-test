import { Component, OnInit } from '@angular/core';
import {BookListService} from '../shared/book-list.service';
import {Book} from '../shared/book';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  bookList: Book[];
  allBooks: Book[];
  maxSize: number = 5;
  bigTotalItems: number = 100;
  bigCurrentPage: number = 1;
  numPages: number = 0;
  itemsPerPage: number = 4;

  begin: number = 0;
  end: number = this.itemsPerPage;

  success: boolean;
  bookTitle: string;
  sortDirection = 'desc';
  searchStr = '';

  constructor(private bookService: BookListService) {

  }

  ngOnInit() {
    this.bigTotalItems = this.bookService.getData().length;
    this.allBooks = this.bookService.getData();
    this.updateList(this.begin, this.end);
  }

  sort(sortDir: string) {
    (sortDir === 'desc') ? this.sortDirection = 'asc' : this.sortDirection = 'desc';
    this.bookList.sort((a, b) => {
      const x = a.title.toLowerCase();
      const y = b.title.toLowerCase();
      if (x < y) { return (sortDir === 'desc') ? -1 : 1; }
      if (x > y) { return (sortDir === 'desc') ? 1 : -1; }
      return 0;
    });
  }

  updateList(begin, end) {
    this.bookList = this.bookService.getData().slice(begin, end);
  }

  removeBook(bookId, bookTitle) {
    this.bookService.removeItem(bookId);
    this.updateList(this.begin, this.end);
    this.bigTotalItems = this.bookService.getData().length;
    this.bookTitle = bookTitle;

    this.success = true;
    setTimeout(() => this.success = false, 2000);
  }


  pageChanged(event: any): void {
    const begin = event.page * event.itemsPerPage - event.itemsPerPage;
    const end = event.page * event.itemsPerPage;
    this.updateList(begin, end);
  }

}
