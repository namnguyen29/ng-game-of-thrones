import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
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
  private readonly meta = inject(Meta);

  constructor() {
    this.meta.addTags([
      { name: 'description', content: 'Chi tiết sách Angular với SSR SEO friendly Nam' },
      { name: 'keywords', content: 'Angular, SSR, SEO, Book Detail' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }

  public naviagteTo(route: string): void {
    this.router.navigate([route]);
  }
}
