import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, of } from 'rxjs';
import { Categoria } from '../interface/categoria';

@Injectable({
  providedIn: 'root'
})
//Óscar
export class CategoriasService {
  baseUrl=environment.baseUrl+environment.urlCategorias
  constructor(private http:HttpClient) { }

  getAllCategoriasAgrupadas(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/agrupadas').pipe(

      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getAllCategorias(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  insertCategoria(categoria:Categoria): Observable<any | undefined> {
    let body={categoria:categoria}
  
     return this.http.post<any>(this.baseUrl,categoria,{params: {auth: true}})
   }
   getCategoria(id:number): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteCategoria(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  updateCategoria(categoria:Categoria): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+categoria.id,categoria,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }
}
