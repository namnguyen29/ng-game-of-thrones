import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { booksActions, selectBooksVm } from '@got-modules/resources/store';

@Component({
  selector: 'got-book-list',
  standalone: true,
  imports: [],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent implements OnInit {
  private readonly store = inject(Store);
  public readonly booksVm$ = this.store.select(selectBooksVm);

  public ngOnInit(): void {
    this.store.dispatch(booksActions.loadBooks());
    this.booksVm$.subscribe((x) => console.log('@booksVm::', x));
  }
}
