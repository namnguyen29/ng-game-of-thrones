import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';

@Component({
  selector: 'got-login',
  standalone: true,
  imports: [ReactiveFormsModule, TuiInputModule, TuiErrorModule, TuiButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  public loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  });

  public get emailControl(): FormControl {
    return this.loginForm.controls['email'];
  }

  public get passwordControl(): FormControl {
    return this.loginForm.controls['password'];
  }

  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log('@form values::', this.loginForm);
    this.router.navigate(['/']);
  }
}
