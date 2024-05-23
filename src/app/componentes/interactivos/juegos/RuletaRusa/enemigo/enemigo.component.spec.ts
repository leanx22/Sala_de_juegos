import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemigoComponent } from './enemigo.component';

describe('EnemigoComponent', () => {
  let component: EnemigoComponent;
  let fixture: ComponentFixture<EnemigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnemigoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnemigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
