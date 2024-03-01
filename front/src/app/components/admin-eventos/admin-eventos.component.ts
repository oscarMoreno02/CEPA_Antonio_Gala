import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EventosService } from '../../services/eventos.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Evento } from '../../interface/evento';
import { NuevoEventosComponent } from "../nuevo-eventos/nuevo-eventos.component";
import { EditarEventoComponent } from "../editar-evento/editar-evento.component";
import { AdminAsistenciasComponent } from "../admin-asistencias/admin-asistencias.component";
import { Router, RouterLink, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-eventos',
    standalone: true,
    templateUrl: './admin-eventos.component.html',
    styleUrl: './admin-eventos.component.css',
    imports: [
        ToastModule,
        TableModule,
        ButtonModule,
        NuevoEventosComponent,
        EditarEventoComponent,
        AdminAsistenciasComponent,
        RouterLink,
        RouterModule
    ],
    providers: [
      MessageService,
      EventosService
  ]
})

export class EventosComponent implements OnInit {

  eventos:Array<Evento>=[]

  constructor(
    private servicioEventos : EventosService,
    private router:Router
    ) {}

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
      });
  }
  formatearSrc(){
    for (let i=0 ; i<this.eventos.length;i++){
      if(!this.eventos[i].fotoCartel.includes('http') || !this.eventos[i].fotoCartel.includes('https')){
        this.eventos[i].fotoCartel = "../../../../../back/uploads/eventos/"+this.eventos[i].fotoCartel
        console.log(this.eventos[i].fotoCartel)
      }
      
    }
  }
}