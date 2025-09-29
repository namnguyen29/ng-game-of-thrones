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
    this.meta.updateTag({
      name: 'description',
      content: 'Nam Explore the world of Game of Thrones: houses, characters, battles and history.'
    });
    this.meta.updateTag({ name: 'keywords', content: 'Game of Thrones, Houses, Characters, Stark, Lannister' });
    this.meta.addTags([
      { name: 'robots', content: 'index, follow' },
      { property: 'og:description', content: 'A simple SSR SEO Example - Book Detail' },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: 'ng-game-of-thrones.vercel.app/got-house.webp' },
      { property: 'og:image', content: 'ng-game-of-thrones.vercel.app/got-house.webp' }
    ]);
  }

  public async navigate(route: string): Promise<void> {
    await this.router.navigate([route]);
  }
}
