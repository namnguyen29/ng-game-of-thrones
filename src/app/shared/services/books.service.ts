import { inject, Injectable } from '@angular/core';

import { ENV_CONFIG } from '@app-core/configs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private readonly env = inject(ENV_CONFIG);
}
