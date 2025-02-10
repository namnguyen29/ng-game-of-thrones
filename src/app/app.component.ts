import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

import { IconKey } from '@app-shared/enums';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public iconRegistry = inject(MatIconRegistry);
  public sanitizer = inject(DomSanitizer);

  constructor() {
    this.regiserIcons();
  }

  private regiserIcons(): void {
    const iconKeys = Object.values(IconKey);
    iconKeys.forEach((iconKey) => {
      this.iconRegistry.addSvgIcon(
        iconKey,
        this.sanitizer.bypassSecurityTrustResourceUrl(`${iconKey}.svg`)
      );
    });
  }
}
