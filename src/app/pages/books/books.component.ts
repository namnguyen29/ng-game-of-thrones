import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { finalize, map, Observable } from 'rxjs';

import { BookApi } from '@app-shared/apis';
import { CardsSkeletonComponent, ResourceCardComponent } from '@app-shared/components';
import { BooksFilterComponent } from './components';
import type { Book, BookFilter } from '@app-shared/models';
import { StringUtil } from '@app-shared/utils';

@Component({
  selector: 'app-books',
  imports: [
    AsyncPipe,
    CardsSkeletonComponent,
    ResourceCardComponent,
    MatButtonModule,
    MatIconModule,
    BooksFilterComponent
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksComponent implements OnInit {
  private readonly bookApi = inject(BookApi);
  private readonly router = inject(Router);
  public books$!: Observable<Book[]>;
  public isLoading = false;

  public ngOnInit(): void {
    this.isLoading = true;
    this.books$ = this.bookApi.getBooks().pipe(
      map((books) => books.map((book) => ({ ...book, url: StringUtil.getResourceIdFromUrl(book.url) }))),
      finalize(() => (this.isLoading = false))
    );
  }

  public handleBookFilter(value: BookFilter): void {
    const { name, fromReleaseDate, toReleaseDate } = value;
    this.router.navigate([], {
      queryParams: {
        name: name !== '' && name !== null ? name : null,
        fromReleaseDate: fromReleaseDate ?? null,
        toReleaseDate: toReleaseDate ?? null
      },
      queryParamsHandling: 'merge'
    });
    this.books$ = this.bookApi.getBooks(value);
  }

  public goHome(): void {
    this.router.navigate(['/']);
  }

  public viewBookDetail(bookId: string): void {
    this.router.navigate(['/books', bookId]);
  }
}
