import { TransferKeys } from '@app-shared/enums';
import { makeStateKey } from '@angular/core';
import type { House } from '@app-shared/models';

export const transferState = {
  [TransferKeys.Houses]: makeStateKey<House[]>(TransferKeys.Houses)
};
