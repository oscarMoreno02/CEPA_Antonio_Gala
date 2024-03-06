//Raul

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { RolAsignado } from '../interface/rolAsignado';

@Injectable({
  providedIn: 'root'
})
export class RolAsignadoService {
  baseUrl = environment.baseUrl+environment.urlRolAsignado
  constructor(private http:HttpClient) { }

  rolesAsignadosGetIdUsu(idUser:number): Observable<any  | undefined> {
   
    return this.http.get<any>(this.baseUrl+'/'+idUser).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }

  rolesAsignadosPost(idUser:number,idRol:number): Observable<any  | undefined> {
    let body={idUser,idRol}
    return this.http.post<any>(this.baseUrl,body).pipe()
  } 

  rolesAsignadosDelete(idUser:number, idRol:number): Observable<any | undefined> {
    return this.http.delete<any>(this.baseUrl+'/'+idUser+'/'+idRol).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
}

 