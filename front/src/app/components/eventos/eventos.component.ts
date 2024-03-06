/**Laura María Pedraza Gómez */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '../../interface/evento';
import { EventosService } from '../../services/eventos.service';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../environments/environment.development';
import { ConfirmComponent } from '../confirm/confirm.component';
import { AuthService } from '../../services/auth.service';
import { JsPDFService } from '../../services/js-pdfservice.service';
import { AsistenciaService } from '../../services/asistencia.service';
import { Asistencia } from '../../interface/asistencia';
import { MessageService } from 'primeng/api';
import { GaleriaService } from '../../services/galeria.service';
import { Galeria } from '../../interface/galeria';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-eventos',
    standalone: true,
    templateUrl: './eventos.component.html',
    styleUrl: './eventos.component.css',
    providers: [MessageService, AsistenciaService, EventosService, JsPDFService],
    imports: [
        ButtonModule,
        ConfirmComponent,
        ToastModule
    ]
})
export class EventosComponent implements OnInit{
  constructor(
    private eventoServicio : EventosService,
    private route: ActivatedRoute,
    private authServicio : AuthService,
    private jsPDFService: JsPDFService,
    private asistenciaServicio : AsistenciaService,
    public messageService:MessageService,
    private servicioGaleria : GaleriaService,
  ) {}

  evento! : Evento
  eventoId!: number;

  galerias: Array<Galeria> = []
  @Input () userId!: number;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.eventoId = +idParam
      this.eventoServicio.getEvento(this.eventoId).subscribe({
        next: (evento: any) => {
          this.evento=evento;
          if(!this.evento.fotoCartel.includes('http') || !this.evento.fotoCartel.includes('https')){
            this.evento.fotoCartel = environment.baseUrl + environment.urlFotosEventos + '/' + this.evento.fotoCartel
          }  
        }
      })

      this.servicioGaleria.getGaleriaEvento(this.eventoId).subscribe({
        next: (fotos: any) => {
          this.galerias = fotos
          console.log(this.galerias)
          this.formatearSrc();
        },
      });

      try {
        this.userId = this.authServicio.getUid() 
      } catch {
        this.userId = 0
      }

    }    
  }

  formatearSrc() {
    for (let i = 0; i < this.galerias.length; i++) {
       if (!this.galerias[i].foto.includes('http') || !this.galerias[i].foto.includes('https')) {
         this.galerias[i].foto = environment.baseUrl+ '/uploads/galerias/' + this.galerias[i].foto;
       }
    }
  }

  sumarMg(){
    this.eventoServicio.plusMgEvento(this.eventoId).subscribe({
      next: (evento: any) => {
        this.evento = evento
        if(!this.evento.fotoCartel.includes('http') || !this.evento.fotoCartel.includes('https')){
          this.evento.fotoCartel = environment.baseUrl + environment.urlFotosEventos + '/' + this.evento.fotoCartel
        }  
      }
    })
  }

  downloadPDF(): void {
    const doc = this.jsPDFService.getPDF();
   
    if (this.evento.fotoCartel && this.evento.fotoCartel.includes('http')) {
       const img = new Image();
       img.crossOrigin = 'Anonymous';
       img.src = this.evento.fotoCartel;
       img.onload = () => {
         doc.addImage(img, 'JPEG', 10, 10, 190, 250);
         doc.save(this.evento.nombre + '.pdf');
       };
    }
   } 

   asistencia = {
    idUsuario : 0,
    idEvento : 0
  }
   
   apuntarAsistente(confirm:Boolean){
    if (confirm){
      this.asistencia.idEvento = this.eventoId
      this.asistencia.idUsuario=this.userId
      this.asistenciaServicio.insertAsistencia(this.asistencia).subscribe({
        next: (data:any) => {
          this.eventoServicio.deletePlaza(this.eventoId).subscribe({
            next: (data:any) => {
              this.evento = data
                this.messageService.add({severity: 'success', summary:'Apuntarse a evento', detail:'Completado', life:3000});
                this.asistencia.idUsuario = 0
                this.asistencia.idEvento = 0
                if(!this.evento.fotoCartel.includes('http') || !this.evento.fotoCartel.includes('https')){
                  this.evento.fotoCartel = environment.baseUrl + environment.urlFotosEventos + '/' + this.evento.fotoCartel
                } 
            },
            error: (error) => {
              this.messageService.add({severity: 'error', summary:'Apuntarse a evento', detail:'Ya se encuentra apuntado', life:3000});
            }
          }) 
        },
        error: (error) => {
          this.messageService.add({severity: 'error', summary:'Apuntarse a evento', detail:'Ya se encuentra apuntado', life:3000});
        }
      })
    }
   }

}
