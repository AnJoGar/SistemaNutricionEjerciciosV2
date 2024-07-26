import { TestBed } from '@angular/core/testing';

import { AlimetotalService } from './alimetotal.service';

describe('AlimetotalService', () => {
  let service: AlimetotalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlimetotalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
