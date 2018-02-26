import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import {RouterModule} from '@angular/router';
import {BookListService} from './shared/book-list.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';
import {SearchPipe} from './search.pipe';

const routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'list', component: BookListComponent},
  {path: 'addBook', component: BookFormComponent},
  {path: 'editBook/:id', component: BookFormComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookFormComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [BookListService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
