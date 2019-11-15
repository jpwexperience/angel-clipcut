import { TestBed } from '@angular/core/testing';

import { FilmInitService } from './film-init.service';

describe('FilmInitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilmInitService = TestBed.get(FilmInitService);
    expect(service).toBeTruthy();
  });
});
