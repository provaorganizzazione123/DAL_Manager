import { TestBed } from '@angular/core/testing';

import { FiltriService } from './filtri.service';

describe('FiltriService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FiltriService = TestBed.get(FiltriService);
    expect(service).toBeTruthy();
  });
});
