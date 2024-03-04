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
    console.log(this.baseUrl+'/'+idUser)
    return this.http.get<any>(this.baseUrl+'/'+idUser).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }

  rolesAsignadosPost(rolAsig:RolAsignado): Observable<any  | undefined> {
    let body={rolAsig:rolAsig}
    return this.http.post<any>(this.baseUrl,rolAsig).pipe()
  } 

  rolesAsignadosDelete(idUser:number, idRol:number): Observable<any | undefined> {
    return this.http.delete<any>(this.baseUrl+'/'+idUser+'/'+idRol).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
}

 