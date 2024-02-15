import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EventosService } from '../services/eventos.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Evento } from '../interface/evento';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    ToastModule,
    TableModule,
    ButtonModule
  ],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
  providers: [
    MessageService, 
    EventosService
  ]
})

export class EventosComponent implements OnInit {

  eventos:Array<Evento>=[]

  constructor(private servicioEventos : EventosService) {}

  ngOnInit(): void {
    this.servicioEventos.getAllEventos().subscribe({
      next:(eventos: Array<Evento>) => {
        this.eventos = eventos;
        console.log("Llegan los eventos: "+eventos)
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }
}