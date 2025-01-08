import {
  Component,
  ElementRef,
  OnDestroy,
  effect,
  forwardRef,
  inject,
  input,
  viewChild
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

import { TextInputProps, TextInputElement } from '@app-shared/models';

@Component({
  selector: 'app-text-input',
  imports: [MatInputModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  host: {
    '[id]': 'id',
    '[class.floating]': 'shouldLabelFloat',
    '(focusin)': 'onFocusIn()',
    '(focusout)': 'onFocusOut($event)'
  },
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => TextInputComponent)
    }
  ]
})
export class TextInputComponent
  implements ControlValueAccessor, MatFormFieldControl<string>, OnDestroy
{
  private readonly inputRef = viewChild<ElementRef<TextInputElement>>('inputTmpl');
  private touched = false;
  public static readonly nextId = `${Math.random()}-${Date.now()}`;
  public readonly disableAutomaticLabeling = true;
  public readonly controlType = 'text-input';
  public readonly stateChanges = new Subject<void>();
  public readonly props = input.required<TextInputProps>();
  public readonly ngControl = inject(NgControl, { self: true, optional: true });
  public placeholder = '';
  public id = '';
  public disabled = false;
  public required = false;
  public focused = false;
  public value = '';
  public userAriaDescribedBy = '';

  constructor() {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    effect(() => {
      const { placeholder, disabled, required, name } = this.props();
      if (disabled) {
        this.disabled = disabled;
      }
      if (required) {
        this.required = required;
      }
      this.id = `input-${name}-${TextInputComponent.nextId}`;
      this.placeholder = placeholder;
      this.stateChanges.next();
    });

    effect(() => {
      const { autofocus } = this.props();
      if (autofocus) {
        this.inputRef()?.nativeElement.focus();
      }
      this.stateChanges.next();
    });
  }

  public ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  public get empty(): boolean {
    return !this.value;
  }

  public get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  public get errorState(): boolean {
    return (this.ngControl?.invalid && this.touched) ?? false;
  }

  public writeValue(value: string): void {
    this.onTextInputChanged(value);
  }

  public registerOnChange(fn: (value: unknown) => void): void {
    this.onTextInputChanged = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTextInputTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.stateChanges.next();
  }

  public onChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onTextInputChanged(value);
  }

  public onBlur(): void {
    this.onTextInputTouched();
  }

  public onFocusIn(): void {
    if (!this.focused) {
      this.touched = true;
      this.focused = true;
      this.stateChanges.next();
    }
  }

  public onFocusOut(event: FocusEvent): void {
    const inputElement = this.inputRef()?.nativeElement;
    if (!inputElement?.contains(event.relatedTarget as Element)) {
      this.focused = false;
      this.stateChanges.next();
    }
  }

  public setDescribedByIds(ids: string[]): void {
    this.inputRef()?.nativeElement.setAttribute('aria-describedby', ids.join(' '));
  }

  public onContainerClick(): void {
    return;
  }

  private onTextInputChanged(value: string): void {
    this.value = value;
    this.stateChanges.next();
  }

  private onTextInputTouched(): void {
    return;
  }
}
