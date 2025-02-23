import { NgTemplateOutlet } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, MatIconModule, NgTemplateOutlet],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  public title = input('');
  public fontIcon = input('');
  public type = input<'submit' | 'button'>('button');
  public variant = input<'base' | 'primary' | 'outline'>('primary');
  public onClick = output<void>();
}
