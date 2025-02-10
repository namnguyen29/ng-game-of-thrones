import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ResourceCardComponent } from '@app-shared/components';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [ResourceCardComponent],
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly router = inject(Router);

  public naviagteTo(route: string): void {
    this.router.navigate([route]);
  }
}
