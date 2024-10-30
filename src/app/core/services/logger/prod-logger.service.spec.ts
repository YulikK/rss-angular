import { TestBed } from '@angular/core/testing';

import { ProdLoggerService } from './prod-logger.service';

describe('ProdLoggerService', () => {
  let service: ProdLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
