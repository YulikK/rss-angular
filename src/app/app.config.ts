import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { LoggerService } from './core/services/logger/logger.service';
import { DevLoggerService } from './core/services/logger/dev-logger.service';
import { ProdLoggerService } from './core/services/logger/prod-logger.service';
import { apiInterceptor } from './youtube/services/inteceptor/api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([apiInterceptor])),
    { provide: LoggerService, useClass: isDevMode() ? DevLoggerService : ProdLoggerService },
  ],
};
