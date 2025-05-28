import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { forceDashboardGuard } from './force-dashboard.guard';

describe('forceDashboardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => forceDashboardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
