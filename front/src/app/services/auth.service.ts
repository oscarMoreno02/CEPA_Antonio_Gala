import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Usuario } from '../interface/usuario';
@Injectable({
  providedIn: 'root'
})
//Óscar
// Laura -> modificación getUid()
export class AuthService  {
  private baseUrl = environment.baseUrl+environment.urlAuth

  constructor(
    private http:HttpClient
  ) { 
    try{
      this.t=this.getToken()
      if(this.t.length>1){
        this.payload=jwtDecode<any>(this.t)
        this.abilities=this.payload.abilities
      }
    }catch(e){
      sessionStorage.clear()
      window.location.href=''
    }
    }
  private _isLoggedIn: boolean = false;
 t?
 payload?
 abilities?
 login(email:string,password:string): Observable<any | undefined> {
  let body={email:email,password:password}
  return this.http.put<any>(this.baseUrl+environment.urlLogin,body)
}
registro(usuario:Usuario): Observable<any | undefined> {
  let body={nombre:usuario.nombre,password:usuario.password,email:usuario.email}
  return this.http.post<any>(this.baseUrl+environment.urlRegistro,body)
}

  hasRol(rol:Array<String>):boolean{
  
    let pasa=false
    for (let i =0;i<rol.length;i++){
      if(this.abilities?.includes(rol[i])){      
        pasa=true
      }
    }
    return pasa
  }

  getToken(): string   {
    const serializedObj = sessionStorage.getItem('token');
 
    if (serializedObj) {
      return serializedObj
    }else{
      return ''
    }
  }
  getRoles(){
    this.t=this.getToken()
    this.payload=jwtDecode<any>(this.t)
    this.abilities=this.payload.abilities
   
      return this.abilities
  }
  getUid(){
    this.t=this.getToken()
    this.payload=jwtDecode<any>(this.t)
    this.abilities=this.payload.abilities
    return this.payload.uid
  }
  getName(){
    this.t=this.getToken()
    this.payload=jwtDecode<any>(this.t)
    this.abilities=this.payload.abilities

    return this.payload.uname
  }
  loginOn() {
    this._isLoggedIn = true;
  }
changeAccess(acceso:string){
  sessionStorage.setItem('access',acceso)
}
clearAccess(){
  sessionStorage.removeItem('access')
}
get getAccess():string{
  const serializedObj = sessionStorage.getItem('access');

  if (serializedObj) {
    return serializedObj
  }else{
    return ''
  }
 
}
  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('access')
  }
  get isLoggedIn(): boolean {
   if(this.getToken().length>1){
    return true
   }else{
    return false
   }
  }
}
