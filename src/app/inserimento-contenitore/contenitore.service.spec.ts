import { TestBed } from '@angular/core/testing';

import { ContenitoreService } from './contenitore.service';

describe('ContenitoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContenitoreService = TestBed.get(ContenitoreService);
    expect(service).toBeTruthy();
  });
});
