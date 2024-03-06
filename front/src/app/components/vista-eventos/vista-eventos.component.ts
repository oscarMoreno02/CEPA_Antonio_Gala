/**Laura María Pedraza Gómez */
import { Component, OnInit, Input } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Evento } from '../../interface/evento';
import { EventosService } from '../../services/eventos.service';
import { PreviewEventosComponent } from "../preview-eventos/preview-eventos.component";
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-vista-eventos',
  standalone: true,
  imports: [PreviewEventosComponent],
  templateUrl: './vista-eventos.component.html',
  styleUrl: './vista-eventos.component.css'
})

export class VistaEventosComponent implements OnInit{
  constructor(
    private servicioEventos:EventosService,
    private authService:AuthService
  ){}

  @Input() eventos:Array<Evento>=[]

  ngOnInit(): void {

    this.authService.clearAccess()
    this.servicioEventos.getEventosActivos()
      .pipe(
        finalize(() => this.formatearSrc())
      )
      .subscribe({
        next:(eventos: Array<Evento>) => {
          this.eventos = eventos;
        },
        error:(err)=>{
          
        }
      })
  }

  formatearSrc(){
    for (let i=0 ; i<this.eventos.length;i++){
      if(!this.eventos[i].fotoCartel.includes('http') || !this.eventos[i].fotoCartel.includes('https')){
        this.eventos[i].fotoCartel = environment.baseUrl + environment.urlFotosEventos + '/' + this.eventos[i].fotoCartel
      }   
    }
  }
}
