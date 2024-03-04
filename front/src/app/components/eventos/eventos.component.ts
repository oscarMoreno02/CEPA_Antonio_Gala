/**Laura María Pedraza Gómez */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '../../interface/evento';
import { EventosService } from '../../services/eventos.service';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../environments/environment.development';
import { ConfirmComponent } from '../confirm/confirm.component';
import { AuthService } from '../../services/auth.service';
// import { jsPDF } from 'jspdf';
import { JsPDFService } from '../../services/js-pdfservice.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmComponent,
  ],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
  providers: []
})
export class EventosComponent implements OnInit{
  constructor(
    private eventoServicio : EventosService,
    private route: ActivatedRoute,
    private authServicio : AuthService,
    private jsPDFService: JsPDFService
  ) {}

  evento! : Evento
  eventoId!: number;

  userId!: number;

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
        this.authServicio.getUid().subscribe({
          next:(uid: any) => {
            if (uid) {
              this.userId = uid
            } else {
              this.userId = 0
            } 
          } 
        })
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
         doc.addImage(img, 'JPEG', 10, 10, 180, 160);
         doc.save(this.evento.nombre + '.pdf');
       };
    }
   }   

}
