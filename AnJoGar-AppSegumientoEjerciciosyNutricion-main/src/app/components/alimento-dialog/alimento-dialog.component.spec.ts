import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentoDialogComponent } from './alimento-dialog.component';

describe('AlimentoDialogComponent', () => {
  let component: AlimentoDialogComponent;
  let fixture: ComponentFixture<AlimentoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlimentoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlimentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
