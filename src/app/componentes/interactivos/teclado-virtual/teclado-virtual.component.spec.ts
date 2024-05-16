import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecladoVirtualComponent } from './teclado-virtual.component';

describe('TecladoVirtualComponent', () => {
  let component: TecladoVirtualComponent;
  let fixture: ComponentFixture<TecladoVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecladoVirtualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TecladoVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
