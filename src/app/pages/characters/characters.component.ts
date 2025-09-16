import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { finalize, map, Observable } from 'rxjs';

import { CardsSkeletonComponent, ResourceCardComponent } from '@app-shared/components';
import { CharacterApi } from '@app-shared/apis';
import type { Character, CharacterFilter } from '@app-shared/models';
import { ChracterFilterComponent } from './components';
import { StringUtil } from '@app-shared/utils';

@Component({
  selector: 'app-characters',
  imports: [
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    CardsSkeletonComponent,
    ResourceCardComponent,
    ChracterFilterComponent
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersComponent {
  private readonly router = inject(Router);
  private readonly characterApi = inject(CharacterApi);
  public characters$!: Observable<Character[]>;
  public isLoading = false;

  constructor() {
    this.isLoading = true;
    this.characters$ = this.characterApi.getCharacters().pipe(
      map((characters) => characters.map((char) => ({ ...char, url: StringUtil.getResourceIdFromUrl(char.url) }))),
      finalize(() => (this.isLoading = false))
    );
  }

  public handleCharacterFilter(value: CharacterFilter): void {
    const { name, gender, culture, born, died, isAlive } = value;
    const queryParams = {
      name: name !== '' && name !== null ? name : null,
      gender: gender !== '' && gender !== null ? gender : null,
      culture: culture !== '' && culture !== null ? culture : null,
      born: born !== '' && born !== null ? born : null,
      died: died !== '' && died !== null ? died : null,
      isAlive: !isAlive ? null : true
    };

    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge'
    });
    this.characters$ = this.characterApi.getCharacters(value);
  }

  public viewCharacterDetail(url: string): void {
    this.router.navigate(['characters', url]);
  }

  public goHome(): void {
    this.router.navigate(['/']);
  }
}
