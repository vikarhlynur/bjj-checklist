import { TestBed } from '@angular/core/testing';

import { BjjChecklistService } from './bjj-checklist.service';

describe('BjjChecklistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BjjChecklistService = TestBed.get(BjjChecklistService);
    expect(service).toBeTruthy();
  });
});
