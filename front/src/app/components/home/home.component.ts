
import { Component, Input, OnInit, ViewEncapsulation  } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Evento } from '../../interface/evento';
import { EventosService } from '../../services/eventos.service';
import { PreviewEventosComponent } from "../preview-eventos/preview-eventos.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [PreviewEventosComponent],
  encapsulation:ViewEncapsulation.None

})
export class HomeComponent implements OnInit {

  constructor(
    private servicioEventos:EventosService
  ){}

  @Input() eventos:Array<Evento>=[]

  ngOnInit(): void {
    this.servicioEventos.getAllEventos()
      .pipe(
        finalize(() => this.formatearSrc())
      )
      .subscribe({
        next:(eventos: Array<Evento>) => {
          this.eventos = eventos;
        },
        error:(err)=>{
          console.log(err)
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
