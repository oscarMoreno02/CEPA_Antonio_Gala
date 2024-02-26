import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Enlace } from '../interface/noticia';

@Injectable({
  providedIn: 'root'
})
//Óscar
export class EnlaceService {
  baseUrl=environment.baseUrl+environment.urlEnlace
  constructor(private http:HttpClient) { }


  getAllEnlaces(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }

  insertEnlace(enlace:Enlace): Observable<any | undefined> {
    let body={enlace:enlace}
  
     return this.http.post<any>(this.baseUrl,enlace,{params: {auth: true}}).pipe(
     
     )
   }
   getEnlace(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteEnlace(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  updateEnlace(enlace:Enlace): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+enlace.id,enlace,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }
}
