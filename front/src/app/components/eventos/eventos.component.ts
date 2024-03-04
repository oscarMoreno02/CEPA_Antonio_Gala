/**Laura María Pedraza Gómez */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '../../interface/evento';
import { EventosService } from '../../services/eventos.service';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../environments/environment.development';
import { ConfirmComponent } from '../confirm/confirm.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmComponent
  ],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent implements OnInit{
  constructor(
    private eventoServicio : EventosService,
    private route: ActivatedRoute,
    private authServicio : AuthService
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

}
