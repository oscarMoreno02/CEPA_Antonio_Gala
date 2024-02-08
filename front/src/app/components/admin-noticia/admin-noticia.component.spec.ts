import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNoticiaComponent } from './admin-noticia.component';

describe('AdminNoticiaComponent', () => {
  let component: AdminNoticiaComponent;
  let fixture: ComponentFixture<AdminNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNoticiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
