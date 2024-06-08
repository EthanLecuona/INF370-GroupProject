import { TestBed } from '@angular/core/testing';

import { BookinginfoService } from './bookinginfo.service';

describe('BookinginfoService', () => {
  let service: BookinginfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookinginfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
