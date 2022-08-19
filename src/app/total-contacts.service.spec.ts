import { TestBed } from '@angular/core/testing';

import { TotalContactsService } from './total-contacts.service';

describe('TotalContactsService', () => {
  let service: TotalContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
