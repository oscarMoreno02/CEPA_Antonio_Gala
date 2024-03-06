import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
//Óscar
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      let peticion = request.clone()
      const param = request.params.get('auth')
      if(param){
        let t=sessionStorage.getItem('token')
          if(t){
            peticion = request.clone({
              headers : request.headers.set('x-token',t)
            })
          }
      }
      
        return next.handle(peticion);
    }
}