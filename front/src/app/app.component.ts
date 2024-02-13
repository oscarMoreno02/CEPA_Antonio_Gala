import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, CabeceraComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[MessageService,AuthService]
})
export class AppComponent {
  constructor(servicioAuth:AuthService){}
  title = 'front';
  @Input() logged=false
  login(b:boolean){
    this.logged=b
  }
}
