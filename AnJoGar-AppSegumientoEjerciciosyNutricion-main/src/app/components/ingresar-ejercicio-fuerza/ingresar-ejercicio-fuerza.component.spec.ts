import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarEjercicioFuerzaComponent } from './ingresar-ejercicio-fuerza.component';

describe('IngresarEjercicioFuerzaComponent', () => {
  let component: IngresarEjercicioFuerzaComponent;
  let fixture: ComponentFixture<IngresarEjercicioFuerzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresarEjercicioFuerzaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresarEjercicioFuerzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
