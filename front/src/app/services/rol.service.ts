//Raul

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Rol } from '../interface/rol';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  baseUrl=environment.baseUrl+environment.urlRol
  constructor(private http:HttpClient) { } 

  rolesGet(): Observable<any  | undefined> {
    return this.http.get<any>(this.baseUrl).pipe(
      catchError((error) =>{
  
        return of(undefined)
      })
    )
  }
}
