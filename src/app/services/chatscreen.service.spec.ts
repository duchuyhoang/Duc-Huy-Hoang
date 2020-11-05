import { TestBed } from '@angular/core/testing';

import { ChatscreenService } from './chatscreen.service';

describe('ChatscreenService', () => {
  let service: ChatscreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatscreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
