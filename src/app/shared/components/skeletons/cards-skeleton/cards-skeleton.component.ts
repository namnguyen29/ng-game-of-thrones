import { ChangeDetectionStrategy, Component, computed, input, Signal } from '@angular/core';

@Component({
  selector: 'app-cards-skeleton',
  templateUrl: './cards-skeleton.component.html',
  styleUrl: './cards-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsSkeletonComponent {
  public numberOfSkeletons = input<number>(12);
  public skeletons: Signal<number[]> = computed(() =>
    Array.from({ length: this.numberOfSkeletons() }, (_, index) => index + 1)
  );
}
