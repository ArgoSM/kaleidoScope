import { TestBed } from '@angular/core/testing';

import { BkndService } from './bknd.service';

describe('BkndService', () => {
  let service: BkndService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BkndService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
