import {TestBed} from '@angular/core/testing';

import {TransactionsFilterService} from './transactions-filter.service';

describe('TransactionsFilterService', () => {
  let service: TransactionsFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionsFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
