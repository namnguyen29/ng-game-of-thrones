import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { merge, Subject, takeUntil } from 'rxjs';

import { AuthService } from '@app-shared/services';
import { ButtonComponent } from '@app-shared/components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly destroy$ = new Subject<void>();
  private readonly authService = inject(AuthService);
  public loginForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required])
  });
  public errorMessage = signal({
    username: '',
    password: ''
  });

  public ngOnInit(): void {
    this.validateFields();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get usernameControl(): FormControl<string | null> {
    return this.loginForm.controls['username'];
  }

  public get passwordControl(): FormControl<string | null> {
    return this.loginForm.controls['password'];
  }

  public handleSubmit(): void {
    const isFormValid = this.loginForm.valid;
    if (isFormValid) {
      this.authService.login();
    } else {
      this.loginForm.markAllAsTouched();
      this.usernameControl.updateValueAndValidity({ onlySelf: true });
      this.passwordControl.updateValueAndValidity({ onlySelf: true });
    }
  }

  private validateFields(): void {
    merge(this.usernameControl.valueChanges, this.usernameControl.statusChanges)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.updateUsernameError()
      });

    merge(this.passwordControl.valueChanges, this.passwordControl.statusChanges)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.updatePasswordError()
      });
  }

  private updateUsernameError(): void {
    if (this.usernameControl.hasError('required')) {
      this.errorMessage.update((value) => ({
        ...value,
        username: 'Username field is required'
      }));
    } else {
      this.errorMessage.update((value) => ({
        ...value,
        username: ''
      }));
    }
  }

  private updatePasswordError(): void {
    if (this.passwordControl.hasError('required')) {
      this.errorMessage.update((value) => ({
        ...value,
        password: 'Password field is required'
      }));
    } else {
      this.errorMessage.update((value) => ({
        ...value,
        password: ''
      }));
    }
  }
}
