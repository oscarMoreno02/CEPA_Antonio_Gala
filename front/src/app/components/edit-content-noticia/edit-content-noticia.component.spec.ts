import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContentNoticiaComponent } from './edit-content-noticia.component';

describe('EditContentNoticiaComponent', () => {
  let component: EditContentNoticiaComponent;
  let fixture: ComponentFixture<EditContentNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditContentNoticiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditContentNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
