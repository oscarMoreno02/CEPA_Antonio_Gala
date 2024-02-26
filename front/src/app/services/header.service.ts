import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//Óscar
@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }
  isVisible =true;

  show() {
    this.isVisible=true;
  }

  hide() {
    this.isVisible=false;
  }
}
