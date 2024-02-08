import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaSeccionComponent } from './nueva-seccion.component';

describe('NuevaSeccionComponent', () => {
  let component: NuevaSeccionComponent;
  let fixture: ComponentFixture<NuevaSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaSeccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevaSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
