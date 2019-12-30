import { TestBed } from '@angular/core/testing';

import { LibComponentsService } from './lib-components.service';

describe('LibComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibComponentsService = TestBed.get(LibComponentsService);
    expect(service).toBeTruthy();
  });
});
