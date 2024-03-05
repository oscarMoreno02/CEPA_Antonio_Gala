import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaFotoGaleriaComponent } from './nueva-foto-galeria.component';

describe('NuevaFotoGaleriaComponent', () => {
  let component: NuevaFotoGaleriaComponent;
  let fixture: ComponentFixture<NuevaFotoGaleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaFotoGaleriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevaFotoGaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
