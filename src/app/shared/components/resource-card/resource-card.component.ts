import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ResourceType } from '@app-shared/models';

@Component({
  selector: 'app-resource-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './resource-card.component.html',
  styleUrl: './resource-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceCardComponent {
  public title = input.required<string>();
  public subTitle = input.required<string>();
  public img = input<string>();
  public avatar = input<ResourceType>('house');
  public content = input('');
  public viewDetail = output<void>();
}
