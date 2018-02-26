import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {BookListService} from '../shared/book-list.service';
import {Book} from '../shared/book';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  form: FormGroup;
  id: string;
  formSubmitAttempt: boolean;
  editedBook: Book;
  timer: any;
  success: boolean;
  bookTitle: string;

  constructor(private fb: FormBuilder, private bookService: BookListService, private activateRoute: ActivatedRoute) {

    this.form = fb.group({
      'title': ['', Validators.required],
      'description': '',
      'state': true
    });

    this.id = activateRoute.snapshot.params.id;
  }

  ngOnInit() {
    if (this.id) {
      this.editedBook = this.bookService.getBookById(this.id);
      this.form.patchValue({
        title: this.editedBook.title,
        description: this.editedBook.description,
        state: this.editedBook.state
      });
    }
  }

  addBook(book: Book) {
    this.formSubmitAttempt = true;
    if (this.form.valid) {

      if (this.id) {
        book.id = this.editedBook.id;
        this.bookService.updateItem(book);
      } else {
        this.bookService.addItem(book);
      }

      this.bookTitle = book.title;
      clearTimeout(this.timer);
      this.success = true;
      this.timer = setTimeout( () => {this.success = false; }, 2000 );

    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

}
