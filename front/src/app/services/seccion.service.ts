import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Seccion } from '../interface/noticia';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  baseUrl=environment.baseUrl+environment.urlSecciones
  constructor(private http:HttpClient) { }

  getAllSeccionesWithEnlaces(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/enlaces').pipe(

      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getAllSecciones(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getAllSeccionesByNoticia(noticia:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/noticia/'+noticia).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  insertSeccion(seccion:Seccion): Observable<any | undefined> {
    let body={seccion:seccion}
  
     return this.http.post<any>(this.baseUrl,seccion,{params: {auth: true}}).pipe(
     
     )
   }
   getSeccion(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteSeccion(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  updateSeccion(seccion:Seccion): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+seccion.id,seccion,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }
}
