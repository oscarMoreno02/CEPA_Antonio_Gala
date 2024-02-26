import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { Horario } from '../interface/horario';
//Óscar
@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  baseUrl=environment.baseUrl+environment.urlHorarios
  constructor(private http:HttpClient) { }


  getAllHorarios(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl,{params: {auth: true}})
  }
  getAllHorariosOfAula(idAula:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/aula/'+idAula,{params: {auth: true}})
  }

  getAllHorariosOfAulaWithReservas(idAula:number,day:number,month:number,year:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/aula/'+idAula+'/reservas/'+day+'/'+month+'/'+year,{params: {auth: true}})
  }
  insertHorario(horario:Horario): Observable<any | undefined> {

     return this.http.post<any>(this.baseUrl,horario,{params: {auth: true}}).pipe(
      catchError((error) =>{
        throw error
      })
    )
   }
   getHorario(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        throw error
      })
    )
  }
  deleteHorario(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        throw error
      })
    )
  }
  updateHorario(horario:Horario): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+horario.id,horario,{params: {auth: true}}).pipe(
      catchError((error) =>{
        throw error
      })
    )
   }
}
