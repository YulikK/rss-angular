import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { LoggerService } from './core/services/logger/logger.service';
import { DevLoggerService } from './core/services/logger/dev-logger.service';
import { ProdLoggerService } from './core/services/logger/prod-logger.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide: LoggerService, useClass: isDevMode() ? DevLoggerService : ProdLoggerService },
  ],
};
