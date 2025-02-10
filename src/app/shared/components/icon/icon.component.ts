import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon',
  imports: [MatIconModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  public ariaHidden = input(false);
  public svgIcon = input.required<string>();
  public ariaLabel = computed(() => `${this.svgIcon()} SVG Icons`);
}
