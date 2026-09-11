import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { EnvironmentService } from '@shared-services/environment.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideAppInitializer(() => {
    //   const environmentService = inject(EnvironmentService);
    //   return environmentService.loadConfig();
    // }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
