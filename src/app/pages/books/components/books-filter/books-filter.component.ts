import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  output,
  ValueProvider
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { debounceTime, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';

import { BookFilter } from '@app-shared/models';
import { dateFnsFormat } from '@app-shared/constants';
import { DateFormat } from '@app-shared/enums';

const provideDateLocale = (): ValueProvider => ({
  provide: MAT_DATE_LOCALE,
  useValue: enUS
});

@Component({
  selector: 'app-books-filter',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule],
  templateUrl: './books-filter.component.html',
  styleUrl: './books-filter.component.scss',
  providers: [provideDateFnsAdapter(dateFnsFormat), provideDateLocale()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksFilterComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly fb = inject(FormBuilder);
  public readonly bookFilter = this.fb.group({
    name: this.fb.control(''),
    startDate: this.fb.control(null),
    endDate: this.fb.control(null)
  });
  public filter = output<BookFilter>();

  constructor() {
    this.bookFilter.valueChanges
      .pipe(
        map((values) => {
          const { startDate, endDate, name } = values;
          return {
            name,
            fromReleaseDate: startDate ? format(startDate, DateFormat.DAY_MONTH_YEAR_DASH) : null,
            toReleaseDate: endDate ? format(endDate, DateFormat.DAY_MONTH_YEAR_DASH) : null
          };
        }),
        debounceTime(400),
        distinctUntilChanged<BookFilter>((prev, curr) =>
          Object.keys(prev).every((key) => key === curr[key as keyof BookFilter])
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (value) => this.filter.emit(value)
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
