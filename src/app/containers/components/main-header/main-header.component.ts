import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { AuthService } from '@app-shared/services';

@Component({
  selector: 'app-main-header',
  imports: [RouterLink, MatIconModule, OverlayModule, MatButtonModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainHeaderComponent {
  public isOpen = signal(false);
  private readonly authService = inject(AuthService);

  public toggleUserMenu(): void {
    this.isOpen.update((val) => !val);
  }

  public closeMenu(): void {
    this.isOpen.set(false);
  }

  public logout(): void {
    this.authService.logout();
  }
}
