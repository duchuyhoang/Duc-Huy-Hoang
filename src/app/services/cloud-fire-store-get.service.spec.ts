import { TestBed } from '@angular/core/testing';

import { CloudFireStoreGetService } from './cloud-fire-store-get.service';

describe('CloudFireStoreGetService', () => {
  let service: CloudFireStoreGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudFireStoreGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
