import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';

import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';

import { BookApi, CharacterApi } from '@app-shared/apis';
import type { Book, Character } from '@app-shared/models';
import { StringUtil } from '@app-shared/utils';

@Component({
  selector: 'app-book-detail',
  imports: [MatCardModule, AsyncPipe, RouterLink, MatButtonModule, DatePipe, MatIconModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly bookApi = inject(BookApi);
  private readonly characterApi = inject(CharacterApi);
  private readonly cdr = inject(ChangeDetectorRef);
  public book$!: Observable<Book>;
  public keyCharacters$!: Observable<Character[]>;
  public povCharacters$!: Observable<Character[]>;

  public ngOnInit(): void {
    this.book$ = this.route.params.pipe(
      map((params) => params['bookId']),
      switchMap((bookId: string) => this.bookApi.getBookById(bookId)),
      tap((book) => {
        const povCharacters = book.povCharacters.map((charUrl) =>
          this.characterApi.getCharacterById(+StringUtil.getResourceIdFromUrl(charUrl))
        );
        const keyCharacters = book.characters
          .slice(0, 3)
          .map((charUrl) => this.characterApi.getCharacterById(+StringUtil.getResourceIdFromUrl(charUrl)));

        this.povCharacters$ = forkJoin(povCharacters);
        this.keyCharacters$ = forkJoin(keyCharacters);
      })
    );
  }
}
