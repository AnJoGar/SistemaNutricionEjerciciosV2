import { TestBed } from '@angular/core/testing';

import { RegitrarEjercicioService } from './regitrar-ejercicio.service';

describe('RegitrarEjercicioService', () => {
  let service: RegitrarEjercicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegitrarEjercicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
