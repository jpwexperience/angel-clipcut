import { TestBed } from '@angular/core/testing';

import { FormFunctionalityService } from './form-functionality.service';

describe('FormFunctionalityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormFunctionalityService = TestBed.get(FormFunctionalityService);
    expect(service).toBeTruthy();
  });
});
