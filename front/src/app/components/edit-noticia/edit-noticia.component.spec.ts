import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNoticiaComponent } from './edit-noticia.component';

describe('EditNoticiaComponent', () => {
  let component: EditNoticiaComponent;
  let fixture: ComponentFixture<EditNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNoticiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
