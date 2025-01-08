import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BookApi } from '@app-shared/apis';
import { TextInputComponent } from '@app-shared/components';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, MatFormFieldModule, TextInputComponent, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly bookApi = inject(BookApi);
  private readonly fb = inject(FormBuilder);
  public testForm = this.fb.group({
    username: this.fb.control(''),
    password: this.fb.control('', { validators: Validators.required })
  });

  constructor() {
    this.bookApi.getBooks().subscribe({
      next: (value) => {
        console.log(value);
      }
    });
  }

  public onSubmit(): void {
    console.log('form-errors username::', this.testForm.controls['username'].errors);
    console.log('form-errors password::', this.testForm.controls['password'].errors?.['required']);

    console.log('form values::', this.testForm.value);
  }
}
