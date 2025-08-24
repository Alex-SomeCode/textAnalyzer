import { TestBed } from '@angular/core/testing';

import { TextApiService } from './text-api-service';

describe('TextApiService', () => {
  let service: TextApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
