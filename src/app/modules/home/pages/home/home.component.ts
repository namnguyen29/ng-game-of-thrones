import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TuiAlertService, TuiButtonModule } from '@taiga-ui/core';
import { TuiActionModule } from '@taiga-ui/kit';
import { Subject } from 'rxjs';

@Component({
  selector: 'got-home',
  standalone: true,
  imports: [TuiActionModule, TuiButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnDestroy {
  private readonly destroy$ = new Subject();
  private readonly alert = inject(TuiAlertService);

  public ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.unsubscribe();
  }

  public onClick(result: string): void {
    this.alert.open(result).subscribe();
  }
}
