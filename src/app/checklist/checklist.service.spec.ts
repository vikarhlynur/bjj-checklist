import { TestBed } from '@angular/core/testing';

import { ChecklistService } from './checklist.service';

describe('BjjChecklistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChecklistService = TestBed.get(ChecklistService);
    expect(service).toBeTruthy();
  });
});
