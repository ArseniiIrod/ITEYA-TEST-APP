import { TestBed } from '@angular/core/testing';

import { InMemoryService } from './in-memory.service';

describe('InMemoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InMemoryService = TestBed.get(InMemoryService);
    expect(service).toBeTruthy();
  });
});
