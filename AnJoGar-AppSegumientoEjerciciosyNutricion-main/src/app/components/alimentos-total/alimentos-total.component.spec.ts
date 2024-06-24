import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentosTotalComponent } from './alimentos-total.component';

describe('AlimentosTotalComponent', () => {
  let component: AlimentosTotalComponent;
  let fixture: ComponentFixture<AlimentosTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlimentosTotalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlimentosTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
