import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, of } from 'rxjs';
import { Categoria } from '../interface/categoria';

@Injectable({
  providedIn: 'root'
})
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
  
     return this.http.post<any>(this.baseUrl,categoria).pipe(
     
     )
   }
}
