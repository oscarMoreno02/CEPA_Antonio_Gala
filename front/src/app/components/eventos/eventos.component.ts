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

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmComponent,
  ],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
  providers: [MessageService, AsistenciaService, EventosService, JsPDFService]
})
export class EventosComponent implements OnInit{
  constructor(
    private eventoServicio : EventosService,
    private route: ActivatedRoute,
    private authServicio : AuthService,
    private jsPDFService: JsPDFService,
    private asistenciaServicio : AsistenciaService,
    public messageService:MessageService,
  ) {}

  evento! : Evento
  eventoId!: number;

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
      try {
        this.userId = this.authServicio.getUid() 
      } catch {
        this.userId = 0
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

   asistencia:Asistencia = {
    id:0,
    idEvento:0,
    idUsuario:0
   }
   
   apuntarAsistente(confirm:Boolean){
    if (confirm){
      this.asistencia.idEvento = this.eventoId
      this.asistencia.idUsuario=this.userId
      console.log("Asistencia "+this.asistencia )
      this.asistenciaServicio.insertAsistencia(this.asistencia).subscribe({
        next: (data:any) => {
          setTimeout(() => {
            this.messageService.add({severity: 'success', summary:'Apuntarse a evento', detail:'Completado', life:3000});
          })
        },
        error: (error) => {
          this.messageService.add({severity: 'error', summary:'Apuntarse a evento', detail:'Ya se encuentra apuntado', life:3000});
        }
      }) 
    }
   }

}
