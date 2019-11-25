import { TestBed } from '@angular/core/testing';

import { ClipInitService } from './clip-init.service';

describe('ClipInitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClipInitService = TestBed.get(ClipInitService);
    expect(service).toBeTruthy();
  });
});
