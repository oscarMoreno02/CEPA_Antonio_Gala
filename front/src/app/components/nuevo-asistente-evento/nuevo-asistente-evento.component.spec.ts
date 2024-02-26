import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAsistenteEventoComponent } from './nuevo-asistente-evento.component';

describe('NuevoAsistenteEventoComponent', () => {
  let component: NuevoAsistenteEventoComponent;
  let fixture: ComponentFixture<NuevoAsistenteEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoAsistenteEventoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevoAsistenteEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
