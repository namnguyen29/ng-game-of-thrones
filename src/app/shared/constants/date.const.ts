import { DateFormat } from '@app-shared/enums';

export const dateFnsFormat = {
  parse: {
    dateInput: DateFormat.DAY_MONTH_YEAR_DASH,
    timeInput: 'HH:mm'
  },
  display: {
    dateInput: DateFormat.DAY_MONTH_YEAR_DASH,
    monthLabel: 'MMM',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd/MM/yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
    timeInput: 'HH:mm',
    timeOptionLabel: 'HH:mm'
  }
};
