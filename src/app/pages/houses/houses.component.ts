import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

import { ButtonComponent, ResourceCardComponent } from '@app-shared/components';
import { HouseApi } from '@app-shared/apis';
import { House, HouseFilter } from '@app-shared/models';
import { HouseFilterComponent } from './components';

@Component({
  selector: 'app-houses',
  imports: [
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    ResourceCardComponent,
    HouseFilterComponent,
    ButtonComponent
  ],
  templateUrl: './houses.component.html',
  styleUrl: './houses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HousesComponent implements OnInit {
  private readonly houseApi = inject(HouseApi);
  private readonly router = inject(Router);
  public houses$!: Observable<House[]>;

  public ngOnInit(): void {
    this.houses$ = this.houseApi.getHouses();
  }

  public goHome(): void {
    this.router.navigate(['/']);
  }

  public handleHouseFilter(value: HouseFilter): void {
    const { name, region, words, hasAncestralWeapons, hasDiedOut, hasSeats, hasTitles, hasWords } =
      value;
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
