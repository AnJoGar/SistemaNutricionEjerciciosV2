import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentosAddComponent } from './alimentos-add.component';

describe('AlimentosAddComponent', () => {
  let component: AlimentosAddComponent;
  let fixture: ComponentFixture<AlimentosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlimentosAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlimentosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
