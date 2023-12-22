import { Component, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { charactersActions, selectCharactersVm } from '@got-modules/resources/store';

@Component({
  selector: 'got-character-list',
  standalone: true,
  imports: [],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.less',
})
export class CharacterListComponent implements OnInit {
  private readonly store = inject(Store);
  public readonly charactersVm$ = this.store.select(selectCharactersVm);

  public ngOnInit(): void {
    this.store.dispatch(charactersActions.loadCharacters());
    this.charactersVm$.subscribe((x) => console.log('@charactersVm::', x));
  }
}
