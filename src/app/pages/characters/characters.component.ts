import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

import { ButtonComponent, ResourceCardComponent } from '@app-shared/components';
import { CharacterApi } from '@app-shared/apis';
import { Character, CharacterFilter } from '@app-shared/models';
import { ChracterFilterComponent } from './components';

@Component({
  selector: 'app-characters',
  imports: [
    MatIconModule,
    MatButtonModule,
    ButtonComponent,
    AsyncPipe,
    ResourceCardComponent,
    ButtonComponent,
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

  constructor() {
    this.characters$ = this.characterApi.getCharacters();
  }

  public handleCharacterFilter(value: CharacterFilter): void {
    const { name, gender, culture, born, died, isAlive } = value;
    let queryParams = {
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

  public goHome(): void {
    this.router.navigate(['/']);
  }
}
