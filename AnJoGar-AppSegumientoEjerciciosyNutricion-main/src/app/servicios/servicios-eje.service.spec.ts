import { TestBed } from '@angular/core/testing';

import { ServiciosEjeService } from './servicios-eje.service';

describe('ServiciosEjeService', () => {
  let service: ServiciosEjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosEjeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
