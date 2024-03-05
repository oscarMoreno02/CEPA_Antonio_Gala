import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarRolesComponent } from './modificar-roles.component';

describe('ModificarRolesComponent', () => {
  let component: ModificarRolesComponent;
  let fixture: ComponentFixture<ModificarRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarRolesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
