import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { finalize, forkJoin, map, Observable, switchMap, tap } from 'rxjs';

import { CharacterApi, HouseApi } from '@app-shared/apis';
import { CardsSkeletonComponent } from '@app-shared/components';
import type { Character, House } from '@app-shared/models';
import { StringUtil } from '@app-shared/utils';

@Component({
  selector: 'app-house-detail',
  imports: [AsyncPipe, RouterLink, MatIconModule, MatCardModule, MatButtonModule, CardsSkeletonComponent],
  templateUrl: './house-detail.component.html',
  styleUrl: './house-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseDetailComponent implements OnInit {
  private readonly houseApi = inject(HouseApi);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly characterApi = inject(CharacterApi);
  public house$!: Observable<House>;
  public swornMembers$!: Observable<Character[]>;
  public isLoading = signal(false);

  public ngOnInit(): void {
    this.house$ = this.route.params.pipe(
      tap(() => this.isLoading.set(true)),
      map((params) => +params['houseId']),
      switchMap((houseId) =>
        this.houseApi.getHouseById(houseId).pipe(
          map((house) => ({
            ...house,
            currentLord: StringUtil.getResourceIdFromUrl(house.currentLord),
            swornMembers: house.swornMembers.map((url) => StringUtil.getResourceIdFromUrl(url))
          }))
        )
      ),
      tap((house) => {
        const swornMemberIds = house.swornMembers;
        this.swornMembers$ = forkJoin(
          swornMemberIds.map((id) =>
            this.characterApi.getCharacterById(+id).pipe(
              map((character) => ({ ...character, url: StringUtil.getResourceIdFromUrl(character.url) })),
              finalize(() => this.isLoading.set(false))
            )
          )
        );
      })
    );
  }

  public gotoCharacterDetail(characterId: string): void {
    this.router.navigate(['characters', characterId]);
  }
}
