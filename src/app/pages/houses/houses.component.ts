import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
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
  public houses$!: Observable<House[]>;
  public isLoading = false;

  public ngOnInit(): void {
    this.isLoading = true;
    this.houses$ = this.houseApi.getHouses().pipe(finalize(() => (this.isLoading = false)));
  }

  public goHome(): void {
    this.router.navigate(['/']);
  }

  public viewHouse(id: string): void {
    this.router.navigate(['houses', id]);
  }

  public handleHouseFilter(value: HouseFilter): void {
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

    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge'
    });
    this.houses$ = this.houseApi.getHouses(value);
  }
}
