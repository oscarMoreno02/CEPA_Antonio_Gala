import { HttpInterceptorFn } from '@angular/common/http';

export const addAuthInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req.withCredentials)
  let peticion = req.clone()
  console.log(req.url)
  let t = sessionStorage.getItem('token')
  const param = req.params.get('auth')
  if(param){
      console.log(param)
      if(t){
        peticion = req.clone({
          headers : req.headers.set('x-token',t),
        })
      }
  }
  return next(peticion) ;
};
