import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewNoticiaComponent } from './preview-noticia.component';

describe('PreviewNoticiaComponent', () => {
  let component: PreviewNoticiaComponent;
  let fixture: ComponentFixture<PreviewNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewNoticiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
