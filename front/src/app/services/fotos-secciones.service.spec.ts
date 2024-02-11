import { TestBed } from '@angular/core/testing';

import { FotosSeccionesService } from './fotos-secciones.service';

describe('FotosSeccionesService', () => {
  let service: FotosSeccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotosSeccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
