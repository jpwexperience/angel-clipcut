import { TestBed } from '@angular/core/testing';

import { CommandGenerateService } from './command-generate.service';

describe('CommandGenerateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommandGenerateService = TestBed.get(CommandGenerateService);
    expect(service).toBeTruthy();
  });
});
