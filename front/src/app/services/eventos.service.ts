import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, of } from 'rxjs';
import { Evento } from '../interface/evento';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  baseUrl=environment.baseUrl+environment.urlEventos
  constructor(private http:HttpClient) { }

  getAllEventos(): Observable<any | undefined>{
    return this.http.get<any>(this.baseUrl+'/obtenerEventos').pipe(
      catchError((error)=>{
        return of(undefined)
      })
    )
  }
}
