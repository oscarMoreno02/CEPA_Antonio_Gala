import { TestBed } from '@angular/core/testing';

import { RolAsignadoService } from './services/rol-asignado.service';

describe('RolAsignadoService', () => {
  let service: RolAsignadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolAsignadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
