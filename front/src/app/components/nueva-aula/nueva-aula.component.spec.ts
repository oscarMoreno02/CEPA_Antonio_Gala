import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaAulaComponent } from './nueva-aula.component';

describe('NuevaAulaComponent', () => {
  let component: NuevaAulaComponent;
  let fixture: ComponentFixture<NuevaAulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaAulaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevaAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
