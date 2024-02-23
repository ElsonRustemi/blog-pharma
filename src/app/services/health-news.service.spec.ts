import { TestBed } from '@angular/core/testing';

import { HealthNewsService } from './health-news.service';

describe('HealthNewsService', () => {
  let service: HealthNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
