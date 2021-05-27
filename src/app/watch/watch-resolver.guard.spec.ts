import { TestBed } from '@angular/core/testing';

import { WatchResolverGuard } from './watch-resolver.guard';

describe('WatchResolverGuard', () => {
  let guard: WatchResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WatchResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
