import { TestBed } from '@angular/core/testing';

import { SessionStorageInfoService } from './session-storage-info.service';

describe('SessionStorageInfoService', () => {
  let service: SessionStorageInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
