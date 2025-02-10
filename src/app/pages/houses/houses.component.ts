import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HousesService } from '@app-shared/services';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrl: './houses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HousesComponent {
  private readonly housesService = inject(HousesService);

  constructor() {
    this.housesService.getHouseById(378).subscribe({
      next: (house) => {
        console.log(house);
      }
    });
  }
}
