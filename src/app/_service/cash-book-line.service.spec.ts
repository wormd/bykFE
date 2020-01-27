import { TestBed } from '@angular/core/testing';

import { CashBookLineService } from './cash-book-line.service';

describe('CashBookLineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CashBookLineService = TestBed.get(CashBookLineService);
    expect(service).toBeTruthy();
  });
});
