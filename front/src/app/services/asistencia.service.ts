/*Laura María Pedraza Gómez* */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Asistencia } from '../interface/asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  baseUrl=environment.baseUrl+environment.urlAsistencias
  constructor(private http:HttpClient) { }

  getAsistenciasEvento(eventoId:number): Observable<any | undefined>{
    return this.http.get<any>(this.baseUrl+'/asistenciasEvento/'+eventoId).pipe(
      catchError((error)=>{
        return of(error)
      })
    )
  }

  deleteAsistencia(id:number):Observable<any|undefined>{
    return this.http.delete<any>(this.baseUrl+'/'+id,{params:{auth:true}}).pipe(

    )
  }

  insertAsistencia(asistencia:any):Observable<any|undefined>{
    let body={asistencia:asistencia}
    return this.http.post<any>(this.baseUrl+'/',asistencia,{params:{auth:true}}).pipe(

    )
  }

  getAsistencias():Observable<any|undefined>{
    return this.http.get<any>(this.baseUrl+"/").pipe(

    )
  }

  getAsistenciasUsuario(userId:number):Observable<any|undefined>{
    return this.http.get<any>(this.baseUrl+"/asistenciasUsuario/"+userId, {params:{auth:true}}).pipe(
      
    )
  }
}
