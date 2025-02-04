type HTMLInputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

interface BaseInput {
  name: string;
  required?: boolean;
  disabled?: boolean;
}

export interface TextInputProps extends BaseInput {
  placeholder: string;
  type: Extract<HTMLInputType, 'text' | 'password' | 'email'>;
  multi?: boolean;
  autocomplete?: string;
  autofocus?: boolean;
  error?: string;
}

export type TextInputElement = HTMLInputElement | HTMLTextAreaElement;
