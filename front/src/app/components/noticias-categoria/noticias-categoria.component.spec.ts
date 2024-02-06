import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasCategoriaComponent } from './noticias-categoria.component';

describe('NoticiasCategoriaComponent', () => {
  let component: NoticiasCategoriaComponent;
  let fixture: ComponentFixture<NoticiasCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiasCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoticiasCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
