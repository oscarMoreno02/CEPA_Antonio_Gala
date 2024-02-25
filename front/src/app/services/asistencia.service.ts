import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asistencia } from '../interface/asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  baseUrl=environment.baseUrl+environment.urlAulas
  constructor(private http:HttpClient) { }
}
