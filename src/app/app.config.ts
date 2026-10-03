import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideHttpClient, withFetch} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideEnvironmentNgxMask(),
    provideHttpClient(withFetch())
  ]
};
