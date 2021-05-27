import { TestBed } from '@angular/core/testing';

import { DetailsResolverGuard } from './details-resolver.guard';

describe('DetailsResolverGuard', () => {
  let guard: DetailsResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DetailsResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
