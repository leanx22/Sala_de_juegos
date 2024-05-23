import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaComponent } from './mesa.component';

describe('MesaComponent', () => {
  let component: MesaComponent;
  let fixture: ComponentFixture<MesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
