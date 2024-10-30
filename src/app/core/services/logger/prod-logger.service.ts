import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class ProdLoggerService extends LoggerService {
  override logMessage(message: string): void {
    console.log(`[PROD]: ${message}`);
  }
}
