import { TestBed } from '@angular/core/testing';

import { ErrorGenerateService } from './error-generate.service';

describe('ErrorGenerateService', () => {
  let service: ErrorGenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorGenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
