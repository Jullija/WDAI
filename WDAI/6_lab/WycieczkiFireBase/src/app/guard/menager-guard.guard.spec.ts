import { TestBed } from '@angular/core/testing';

import { MenagerGuardGuard } from './menager-guard.guard';

describe('MenagerGuardGuard', () => {
  let guard: MenagerGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MenagerGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
