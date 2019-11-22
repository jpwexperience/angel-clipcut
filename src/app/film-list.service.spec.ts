import { TestBed } from '@angular/core/testing';

import { FilmListService } from './film-list.service';

describe('FilmListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilmListService = TestBed.get(FilmListService);
    expect(service).toBeTruthy();
  });
});
