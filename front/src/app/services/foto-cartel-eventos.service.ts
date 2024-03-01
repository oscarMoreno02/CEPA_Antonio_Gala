/**Laura María Pedraza Gómez */
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FotoCartelEventosService {

  baseUrl=environment.baseUrl+environment.urlFotosEventos
  constructor(private http:HttpClient) { }

  uploadFoto(formdata:FormData): Observable<any> {
     return this.http.post<any>(this.baseUrl,formdata,{params: {auth: true}})
  }

  getFotoURL(id:string): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }

  deleteFoto(foto:string): Observable<any> {
    return this.http.delete<any>(this.baseUrl+'/'+foto,{params: {auth: true}})
  }

  updateFoto(previa:string,formdata:FormData): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/'+previa,formdata,{params: {auth: true}})
  }
}
