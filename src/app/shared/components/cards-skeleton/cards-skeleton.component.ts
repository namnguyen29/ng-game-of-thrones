import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cards-skeleton',
  templateUrl: './cards-skeleton.component.html',
  styleUrl: './cards-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsSkeletonComponent {
  skeletons = Array.from({ length: 12 }, (_, index) => index + 1);
}
