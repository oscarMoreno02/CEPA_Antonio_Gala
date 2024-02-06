import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCategoriaComponent } from './nueva-categoria.component';

describe('NuevaCategoriaComponent', () => {
  let component: NuevaCategoriaComponent;
  let fixture: ComponentFixture<NuevaCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
