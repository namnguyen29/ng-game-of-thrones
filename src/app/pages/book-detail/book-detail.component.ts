import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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
  public book$!: Observable<Book>;
  public keyCharacters$!: Observable<Character[]>;
  public povCharacters$!: Observable<Character[]>;

  public ngOnInit(): void {
    this.book$ = this.route.params.pipe(
      switchMap((params) => this.bookApi.getBookById(`${params['bookId']}`)),
      tap((book) => {
        const povCharacters = book.povCharacters.map(this.mapCharacterById);
        const keyCharacters = book.characters.slice(0, 3).map(this.mapCharacterById);
        this.povCharacters$ = forkJoin(povCharacters).pipe(map(this.mapCharacterUrl));
        this.keyCharacters$ = forkJoin(keyCharacters).pipe(map(this.mapCharacterUrl));
      })
    );
  }

  private mapCharacterUrl(chars: Character[]): Character[] {
    return chars.map((char) => ({ ...char, url: StringUtil.getResourceIdFromUrl(char.url) }));
  }

  private readonly mapCharacterById = (url: string): Observable<Character> => {
    return this.characterApi.getCharacterById(+StringUtil.getResourceIdFromUrl(url));
  };
}
