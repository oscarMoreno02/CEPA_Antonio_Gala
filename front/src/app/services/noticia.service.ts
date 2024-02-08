import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Noticia } from '../interface/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  baseUrl=environment.baseUrl+environment.urlNoticias
  constructor(private http:HttpClient) { }

  getAllNoticiasConSecciones(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/secciones').pipe(

      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getAllNoticias(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getAllNoticiasByCategoria(categoria:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/categoria/'+categoria).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  insertNoticia(noticia:Noticia): Observable<any | undefined> {
    let body={noticia:noticia}
  
     return this.http.post<any>(this.baseUrl,noticia).pipe(
     
     )
   }
   getNoticia(id:number): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getNoticiaWithSecciones(id:number): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/secciones/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteNoticia(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  updateNoticia(noticia:Noticia): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+noticia.id,noticia,).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }
}
