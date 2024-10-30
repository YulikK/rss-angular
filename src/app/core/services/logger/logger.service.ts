import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class LoggerService {
  /* eslint-disable-next-line no-unused-vars */
  abstract logMessage(message: string): void;
}
