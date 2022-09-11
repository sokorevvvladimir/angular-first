import { TestBed } from '@angular/core/testing';

import { CalendarStoreService } from './calendar-store.service';

describe('CalendarStoreService', () => {
  let service: CalendarStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
