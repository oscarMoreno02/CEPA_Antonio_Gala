import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSeccionComponent } from './editar-seccion.component';

describe('EditarSeccionComponent', () => {
  let component: EditarSeccionComponent;
  let fixture: ComponentFixture<EditarSeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarSeccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
