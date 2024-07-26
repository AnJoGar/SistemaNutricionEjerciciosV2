import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentosGuardadosDialogComponent } from './alimentos-guardados-dialog.component';

describe('AlimentosGuardadosDialogComponent', () => {
  let component: AlimentosGuardadosDialogComponent;
  let fixture: ComponentFixture<AlimentosGuardadosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlimentosGuardadosDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlimentosGuardadosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
