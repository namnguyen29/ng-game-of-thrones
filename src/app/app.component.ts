import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TuiRootModule, TuiDialogModule, TuiAlertModule } from '@taiga-ui/core';

import { domSanitizerProvider } from '@got-core/configs';

@Component({
  selector: 'got-root',
  standalone: true,
  imports: [RouterOutlet, TuiRootModule, TuiDialogModule, TuiAlertModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  providers: [domSanitizerProvider],
})
export class AppComponent {}
