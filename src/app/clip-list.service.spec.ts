import { TestBed } from '@angular/core/testing';

import { ClipListService } from './clip-list.service';

describe('ClipListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClipListService = TestBed.get(ClipListService);
    expect(service).toBeTruthy();
  });
});
