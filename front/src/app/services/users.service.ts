//Raul

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, of } from 'rxjs';
import { Users } from '../interface/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl=environment.baseUrl+environment.urlUsers
  constructor(private http:HttpClient) { }

  usuariosGet(): Observable<any  | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  usuarioGet(id:number): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  usuariosPost(usuarios:Users): Observable<any | undefined> {
    let body={usuarios:usuarios}
    
     return this.http.post<any>(this.baseUrl,usuarios).pipe(
     
     )
   }
  usuariosDelete(id:number): Observable<any | undefined> {

    return this.http.delete<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  usuariosPut(usuarios:Users, id:number): Observable<any | undefined> {
    let body={usuario: usuarios}
    return this.http.put<any>(this.baseUrl+'/'+id,usuarios,{params: {auth: true}}).pipe(

    )
   }
}
