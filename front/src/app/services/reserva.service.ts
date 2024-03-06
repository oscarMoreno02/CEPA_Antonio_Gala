import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Reserva } from '../interface/reserva';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
//Óscar
@Injectable({
  providedIn: 'root'
})
export class ReservaService {
authService=inject(AuthService)

  baseUrl=environment.baseUrl+environment.urlReservas
  constructor(private http:HttpClient) { }


  getAllReservas(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getAllReservasByClaseWithData(idAula:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/aula/'+idAula,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getAllReservasByProfesorWithData(idProfesor:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/profesor/'+idProfesor,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  getAllReservasWithData(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/data/',{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  insertReserva(reserva:Reserva): Observable<any | undefined> {
     return this.http.post<any>(this.baseUrl,reserva,{params: {auth: true}}).pipe(
     )
   }
   getReserva(id:number): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl+'/'+id,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteReserva(id:number): Observable<any | undefined> {
    let notififacion=false
    if(this.authService.getAccess=='jefedeestudios'){
  
      notififacion=true
    }
    return this.http.delete<any>(this.baseUrl+'/'+id,{params: {auth: true,notify:notififacion}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
      )
  }
  updateReserva(reserva:Reserva): Observable<any | undefined> {
     return this.http.put<any>(this.baseUrl+'/'+reserva.id,reserva,{params: {auth: true}}).pipe(
      catchError((error) =>{
        return of(undefined)
      })
     )
   }
}
