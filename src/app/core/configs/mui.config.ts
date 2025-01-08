import { ValueProvider } from '@angular/core';

import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldAppearance
} from '@angular/material/form-field';

export const provideFormFieldAppearance = (value: MatFormFieldAppearance): ValueProvider => ({
  useValue: {
    appearance: value
  },
  provide: MAT_FORM_FIELD_DEFAULT_OPTIONS
});
