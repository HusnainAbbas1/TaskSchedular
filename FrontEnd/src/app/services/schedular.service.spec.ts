import { TestBed } from '@angular/core/testing';

import { SchedularService } from './schedular.service';

describe('SchedularService', () => {
  let service: SchedularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
