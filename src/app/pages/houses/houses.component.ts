import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { finalize, Observable } from 'rxjs';

import { ResourceCardComponent, CardsSkeletonComponent } from '@app-shared/components';
import { HouseApi } from '@app-shared/apis';
import { HouseFilterComponent } from './components';
import type { House, HouseFilter } from '@app-shared/models';

@Component({
  selector: 'app-houses',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatButtonModule,
    CardsSkeletonComponent,
    AsyncPipe,
    ResourceCardComponent,
    HouseFilterComponent
  ],
  templateUrl: './houses.component.html',
  styleUrl: './houses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HousesComponent implements OnInit {
  private readonly houseApi = inject(HouseApi);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  public houses$!: Observable<House[]>;
  public isLoading = signal(true);

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.houses$ = this.houseApi.getHouses().pipe(
        finalize(() => {
          this.isLoading.set(false);
        })
      );
    }
  }

  public async goHome(): Promise<void> {
    await this.router.navigate(['/']);
  }

  public async viewHouse(id: string): Promise<void> {
    await this.router.navigate(['houses', id]);
  }

  public async handleHouseFilter(value: HouseFilter): Promise<void> {
    const { name, region, words, hasAncestralWeapons, hasDiedOut, hasSeats, hasTitles, hasWords } = value;
    const queryParams = {
      name: name !== '' && name !== null ? name : null,
      region: region !== '' && region !== null ? region : null,
      words: words !== '' && words !== null ? words : null,
      hasAncestralWeapons: !hasAncestralWeapons ? null : true,
      hasDiedOut: !hasDiedOut ? null : true,
      hasTitles: !hasTitles ? null : true,
      hasSeats: !hasSeats ? null : true,
      hasWords: !hasWords ? null : true
    };

    await this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge'
    });
    this.houses$ = this.houseApi.getHouses(value);
  }
}
