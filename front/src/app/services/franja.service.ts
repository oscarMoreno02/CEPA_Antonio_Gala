import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Franja } from '../interface/franja';
//Óscar
@Injectable({
  providedIn: 'root'
})
export class FranjaService {
  baseUrl=environment.baseUrl+environment.urlFranjas
  constructor(private http:HttpClient) { }


  getAllFranjas(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl,{params: {auth: true}})
  }

  insertFranja(franja:Franja): Observable<any | undefined> {
    let body={franja:franja}
  
     return this.http.post<any>(this.baseUrl,franja,{params: {auth: true}}).pipe(
      catchError((error) =>{
        throw error
      })
    )
   }
   getFranja(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        throw error
      })
    )
  }
  deleteFranja(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        throw error
      })
    )
  }
  updateFranja(franja:Franja): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+franja.id,franja,{params: {auth: true}}).pipe(
      catchError((error) =>{
        throw error
      })
    )
   }

   sortFranjas(franja:Array<Franja>): Observable<any | undefined> {
    return this.http.put<any>(this.baseUrl+'/sort',franja,{params: {auth: true}}).pipe(
     catchError((error) =>{
       throw error
     })
   )
  }
}
