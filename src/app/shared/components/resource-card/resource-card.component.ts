import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { IconComponent } from '..';

@Component({
  selector: 'app-resource-card',
  imports: [MatCardModule, MatButtonModule, IconComponent],
  templateUrl: './resource-card.component.html',
  styleUrl: './resource-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceCardComponent {
  public title = input<string>();
  public subTitle = input<string>();
  public img = input<string>();
  public avatar = input<'house' | 'book' | 'character'>('house');
  public content = input('');
  public viewDetail = output<void>();
}
