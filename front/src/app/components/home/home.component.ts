/**Laura María Pedraza Gómez */
//Óscar -> noticias
import { Component, Input, OnInit, ViewEncapsulation  } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Evento } from '../../interface/evento';
import { EventosService } from '../../services/eventos.service';
import { PreviewEventosComponent } from "../preview-eventos/preview-eventos.component";
import { NoticiaComponent } from '../noticia/noticia.component';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../interface/noticia';
import { Subscription } from 'rxjs';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { PreviewNoticiaComponent } from '../preview-noticia/preview-noticia.component';
import { AuthService } from '../../services/auth.service';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    encapsulation: ViewEncapsulation.None,
    imports: [PreviewEventosComponent,NoticiaComponent,CardModule,PreviewNoticiaComponent],
    providers:[EventosService]
})
export class HomeComponent implements OnInit {
  httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  @Input() eventos:Array<Evento>=[]
  @Input() last:number = 0
  noticias?:Array<Noticia>
  env=environment
  noticiaSubscripcion:Subscription=new Subscription
  constructor(
    private servicioEventos:EventosService,
    private noticiaService:NoticiaService,
    private authService:AuthService
  ){}
  ngOnInit(): void {
    this.authService.clearAccess()
    this.servicioEventos.getEventosActivos()

      .pipe(
        finalize(() => this.formatearSrc())
      )
      .subscribe({
        next:(eventos: Array<Evento>) => {
          this.eventos = eventos
          this.last = this.eventos.length-1
        },
        error:(err)=>{
     
        }
      })
    this.noticiaSubscripcion=this.noticiaService.getUltimasNoticias().subscribe({
      next:(data:Array<Noticia>)=>{
   
        this.noticias=data
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

  esUrl(foto:string):Boolean{
    return this.httpRegex.test(foto)
    }
  
}
