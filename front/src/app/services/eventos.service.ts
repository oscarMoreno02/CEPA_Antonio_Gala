import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, of } from 'rxjs';
import { Evento } from '../interface/evento';
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  baseUrl=environment.baseUrl+environment.urlEventos
  constructor(private http:HttpClient) { }

  getAllEventos(): Observable<any | undefined>{
    return this.http.get<any>(this.baseUrl+'/obtener').pipe(
      catchError((error)=>{
        return of(undefined)
      })
    )
  }

  getEvento(id:number): Observable<any | undefined>{
    return this.http.get<any>(this.baseUrl+'/obtener/'+id).pipe(
      catchError((error)=>{
        return of(undefined)
      })
    )
  }

  insertEvento(evento:Evento): Observable<any | undefined> {
    let body={evento:evento}
  
     return this.http.post<any>(this.baseUrl,evento).pipe(
     
     )
  }
}
