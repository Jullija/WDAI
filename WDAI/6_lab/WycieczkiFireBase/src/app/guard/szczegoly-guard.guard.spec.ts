import { TestBed } from '@angular/core/testing';

import { SzczegolyGuardGuard } from './szczegoly-guard.guard';

describe('SzczegolyGuardGuard', () => {
  let guard: SzczegolyGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SzczegolyGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
