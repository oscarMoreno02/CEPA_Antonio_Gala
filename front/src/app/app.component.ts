import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { AuthService } from './services/auth.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderService } from './services/header.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, CabeceraComponent,NotFoundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[MessageService,AuthService]
})
export class AppComponent {
  constructor(servicioAuth:AuthService,public headerService:HeaderService){}
  title = 'front';
  @Input() logged=false
  login(b:boolean){
    this.logged=b
  }
  onActivate(event: any) {
    console.log('funciona')
    if (event instanceof NotFoundComponent) {
      this.headerService.hide();
    } else {
      this.headerService.show();
    }
  }
}
