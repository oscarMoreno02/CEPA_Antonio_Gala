/*Laura María Pedraza Gómez* */
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
    this.servicioEventos.getAllEventos().subscribe({
      next:(eventos: Array<Evento>) => {
        this.eventos = eventos;
        console.log(eventos)
        console.log("Llegan los eventos: "+eventos)
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }
}