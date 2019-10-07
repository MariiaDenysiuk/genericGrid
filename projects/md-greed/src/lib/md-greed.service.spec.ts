import { TestBed } from '@angular/core/testing';

import { MdGreedService } from './md-greed.service';

describe('MdGreedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MdGreedService = TestBed.get(MdGreedService);
    expect(service).toBeTruthy();
  });
});
