import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aula } from '../interface/aula';
//Óscar
@Injectable({
  providedIn: 'root'
})
export class AulaService {

  baseUrl=environment.baseUrl+environment.urlAulas
  constructor(private http:HttpClient) { }


  getAllAulas(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl,{params: {auth: true}})
  }

  insertAula(aula:Aula): Observable<any | undefined> {
    let body={aula:aula}
  
     return this.http.post<any>(this.baseUrl,aula,{params: {auth: true}})
   }
   getAula(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/'+id,{params: {auth: true}})
  }
  getAulaWithData(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/data/'+id,{params: {auth: true}})
  }
  deleteAula(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}})
  }
  updateAula(enlace:Aula): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+enlace.id,enlace,{params: {auth: true}})
   }
}
