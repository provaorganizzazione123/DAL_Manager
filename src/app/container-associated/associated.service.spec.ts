import { TestBed } from '@angular/core/testing';

import { AssociatedService } from './associated.service';

describe('AssociatedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssociatedService = TestBed.get(AssociatedService);
    expect(service).toBeTruthy();
  });
});
