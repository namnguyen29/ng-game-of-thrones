import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { Observable, switchMap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { CharacterApi } from '@app-shared/apis';
import { Character } from '@app-shared/models';

@Component({
  selector: 'app-character-detail',
  imports: [MatIconModule, AsyncPipe, RouterLink, MatCardModule, MatButtonModule, MatBadgeModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly characterApi = inject(CharacterApi);
  public character$!: Observable<Character>;

  public ngOnInit(): void {
    this.character$ = this.route.params.pipe(
      switchMap((params) => {
        const characterId = +params['characterId'];
        return this.characterApi.getCharacterById(characterId);
      })
    );
  }
}
