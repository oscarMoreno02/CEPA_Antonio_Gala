/**Laura María Pedraza Gómez */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  baseUrl=environment.baseUrl+environment.urlGaleria
  constructor(private http:HttpClient) { }

  getGalerias(): Observable<any | undefined>{
    return this.http.get<any>(this.baseUrl+'/').pipe(
      catchError((error)=>{
        return of(error)
      })
    )
  }

  getGaleriaId(id:number): Observable<any | undefined>{
    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error)=>{
        return of(error)
      })
    )
  }

  deleteGaleria(id:number):Observable<any|undefined>{
    return this.http.delete<any>(this.baseUrl+'/'+id,{params:{auth:true}}).pipe(

    )
  }

  insertGaleria(galeria:any):Observable<any|undefined>{
    let body={galeria:galeria}
    return this.http.post<any>(this.baseUrl+'/',galeria,{params:{auth:true}}).pipe(

    )
  }

  getGaleriaEvento(id:number): Observable<any|undefined>{
    return this.http.get<any>(this.baseUrl+'/galeriaEvento/'+id).pipe(
      
    )
  }

}
