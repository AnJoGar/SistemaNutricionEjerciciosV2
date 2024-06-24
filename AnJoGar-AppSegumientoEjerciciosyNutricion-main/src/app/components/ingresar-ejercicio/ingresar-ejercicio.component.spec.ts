import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarEjercicioComponent } from './ingresar-ejercicio.component';

describe('IngresarEjercicioComponent', () => {
  let component: IngresarEjercicioComponent;
  let fixture: ComponentFixture<IngresarEjercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresarEjercicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresarEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
