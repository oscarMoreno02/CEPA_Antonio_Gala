import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEventosComponent } from './nuevo-eventos.component';

describe('NuevoEventosComponent', () => {
  let component: NuevoEventosComponent;
  let fixture: ComponentFixture<NuevoEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoEventosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevoEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
