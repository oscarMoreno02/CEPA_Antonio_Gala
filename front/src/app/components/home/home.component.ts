/**Laura María Pedraza Gómez */
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
    encapsulation: ViewEncapsulation.None,
    imports: [PreviewEventosComponent],
    providers:[EventosService]
})
export class HomeComponent implements OnInit {

  @Input() eventos:Array<Evento>=[]
  @Input() last:number = 0

  constructor(
    private servicioEventos:EventosService
  ){}
  ngOnInit(): void {
    this.servicioEventos.getAllEventos()
      .pipe(
        finalize(() => this.formatearSrc())
      )
      .subscribe({
        next:(eventos: Array<Evento>) => {
          this.eventos = eventos
          this.last = this.eventos.length-1
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
