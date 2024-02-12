import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { jwtDecode } from 'jwt-decode';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  private baseUrl = environment.baseUrl+environment.urlAuth

  constructor(
    private http:HttpClient
  ) { 
   this.t=this.getToken()
  //  this.payload=jwtDecode<any>(this.t)
  //  this.abilities=this.payload.abilities
  }
 t?
//  payload?
//  abilities?
 login(email:string,password:string): Observable<any | undefined> {
  let body={email:email,password:password}
  return this.http.put<any>(this.baseUrl+environment.urlLogin,body)
}
registro(email:string,password:string,nombre:string): Observable<any | undefined> {
  let body={email:email,password:password,nombre:nombre}
  return this.http.put<any>(this.baseUrl+environment.urlLogin,body)
}

  // hasRol(rol:Array<String>):boolean{
  //   console.log(rol)
  //   console.log(this.t)
  //   let pasa=false
  //   for (let i =0;i<rol.length;i++){
  //     if(this.abilities!.includes(rol[i])){      
  //       pasa=true
  //     }
  //   }
  //   return pasa
  // }

  getToken(): string   {
    const serializedObj = sessionStorage.getItem('token');
    if (serializedObj) {
      return serializedObj
    }else{
      return ''
    }
  }
  // getRoles(){
  //     return this.abilities
  // }
  // getUid(){
  //   return this.payload.uid
  // }
  // getName(){
  //   console.log(this.payload.uname)
  //   return this.payload.uname
  // }
}
