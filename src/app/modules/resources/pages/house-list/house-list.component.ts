import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { housesActions, selectHousesVm } from '@got-modules/resources/store';

@Component({
  selector: 'got-house-list',
  standalone: true,
  imports: [],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HouseListComponent implements OnInit {
  private readonly store = inject(Store);
  public readonly housesVm$ = this.store.select(selectHousesVm);

  public ngOnInit(): void {
    this.store.dispatch(housesActions.loadHouses());
    this.housesVm$.subscribe((x) => console.log('@housesVm::', x));
  }
}
