import { ChangeDetectionStrategy, Component, inject, OnDestroy, output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { HouseFilter } from '@app-shared/models';

@Component({
  selector: 'app-house-filter',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatCheckboxModule],
  templateUrl: './house-filter.component.html',
  styleUrl: './house-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseFilterComponent implements OnDestroy {
  private readonly fb = inject(UntypedFormBuilder);
  private readonly destroy$ = new Subject<void>();
  public readonly houseFilter = this.fb.group({
    name: this.fb.control(''),
    region: this.fb.control(''),
    words: this.fb.control(''),
    hasWords: this.fb.control(false),
    hasTitles: this.fb.control(''),
    hasSeats: this.fb.control(false),
    hasDiedOut: this.fb.control(''),
    hasAncestralWeapons: this.fb.control(false)
  });
  public filter = output<HouseFilter>();

  constructor() {
    this.houseFilter.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged<HouseFilter>((prev, curr) =>
          Object.keys(prev).every((key) => key === curr[key as keyof HouseFilter])
        ),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (filterValue) => {
          this.filter.emit(filterValue);
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
