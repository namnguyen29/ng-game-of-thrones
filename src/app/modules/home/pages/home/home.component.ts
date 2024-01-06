import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { TuiAlertService, TuiButtonModule } from '@taiga-ui/core';
import { TuiActionModule } from '@taiga-ui/kit';
import { Subject } from 'rxjs';

import { HomeCardComponent } from '@got-modules/home/ui';

@Component({
  selector: 'got-home',
  standalone: true,
  imports: [TuiActionModule, TuiButtonModule, RouterLink, HomeCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnDestroy, AfterViewInit {
  private readonly alert = inject(TuiAlertService);
  private readonly destroy$ = new Subject();

  public ngAfterViewInit(): void {}

  public ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.unsubscribe();
  }

  public onClick(result: string): void {
    this.alert.open(result).subscribe();
  }
}
