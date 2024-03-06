/*Laura María Pedraza Gómez* */
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

  getEventosActivos(): Observable<any | undefined>{
    return this.http.get<any>(this.baseUrl+'/obtenerActivos').pipe(
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
     return this.http.post<any>(this.baseUrl,evento,{params: {auth: true}}).pipe(
     
     )
  }

  updateEvento(evento:Evento, id:number):Observable<any|undefined>{
    let body={evento:evento}
    return this.http.put<any>(this.baseUrl+'/'+id,evento,{params: {auth: true}}).pipe(

    )
  }

  deleteEvento(id:number):Observable<any|undefined>{
    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(

    )
  }

  plusMgEvento(id:number):Observable<any|undefined>{
    let body = null
    return this.http.put<any>(this.baseUrl+'/mg/'+id,body).pipe(

    )
  }

  deletePlaza(id:number):Observable<any|undefined>{
    let body = null
    return this.http.put<any>(this.baseUrl+'/eliminarPlaza/'+id,body).pipe(

    )
  }

  putPlaza(id:number):Observable<any|undefined>{
    let body = null
    return this.http.put<any>(this.baseUrl+'/anadirPlaza/'+id, body).pipe(

    )
  }
}
