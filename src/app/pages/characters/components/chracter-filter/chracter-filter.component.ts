import { ChangeDetectionStrategy, Component, inject, OnDestroy, output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

import { CharacterFilter } from '@app-shared/models';

@Component({
  selector: 'app-chracter-filter',
  imports: [MatFormFieldModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './chracter-filter.component.html',
  styleUrl: './chracter-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChracterFilterComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly fb = inject(UntypedFormBuilder);
  public readonly characterFilter = this.fb.group({
    name: this.fb.control(''),
    gender: this.fb.control(''),
    culture: this.fb.control(''),
    born: this.fb.control(''),
    died: this.fb.control(''),
    isAlive: this.fb.control(false)
  });
  public filter = output<CharacterFilter>();

  constructor() {
    this.characterFilter.valueChanges
      .pipe(
        debounceTime(450),
        distinctUntilChanged<CharacterFilter>((prev, curr) =>
          Object.keys(prev).every((key) => key === curr[key as keyof CharacterFilter])
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
