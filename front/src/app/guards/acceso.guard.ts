import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const accesoGuard: CanActivateFn = (route, state) => {

  let router = inject(Router)
  let authservice=inject(AuthService)
  let rol=route.data['rol']
  if(authservice.hasRol(rol)){
    sessionStorage.setItem('access',rol[0].split(' ').join('').toLowerCase().toString())
    return true;
  }else{
    let url = router.createUrlTree([''])
    return url
};
}