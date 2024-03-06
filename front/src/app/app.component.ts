import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { AuthService } from './services/auth.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderService } from './services/header.service';
import { WebSocketService } from './services/websocket.service';
import { ToastModule } from 'primeng/toast';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, CabeceraComponent,NotFoundComponent,ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[MessageService,AuthService,WebSocketService]
})
export class AppComponent implements OnInit {
  constructor(
    servicioAuth:AuthService,
    public headerService:HeaderService,
    private webSocketService: WebSocketService,
    private messageService:MessageService,
     private config: PrimeNGConfig){}
     
  title = 'front';
  @Input() logged=false
  login(b:boolean){
    this.logged=b
  }
  ngOnInit(): void {
    this.config.setTranslation({
     monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
     monthNamesShort:['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    dayNamesMin:['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],firstDayOfWeek:1
  });
  }
  onActivate(event: any) {

    if (event instanceof NotFoundComponent) {
      this.headerService.hide();
    } else {
      this.headerService.show();
    }
  }
}
