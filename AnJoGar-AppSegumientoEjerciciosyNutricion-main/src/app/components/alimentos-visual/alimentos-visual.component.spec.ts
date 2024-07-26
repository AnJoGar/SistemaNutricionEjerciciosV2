import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentosVisualComponent } from './alimentos-visual.component';

describe('AlimentosVisualComponent', () => {
  let component: AlimentosVisualComponent;
  let fixture: ComponentFixture<AlimentosVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlimentosVisualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlimentosVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
