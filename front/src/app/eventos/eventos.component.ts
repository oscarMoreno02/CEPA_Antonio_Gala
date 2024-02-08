import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EventosService } from '../services/eventos.service';


@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [ToastModule, NgFor],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
  providers: [MessageService]
})
export class EventosComponent implements OnInit {
  eventos: any;

  constructor(private servicioEventos : EventosService) {}

  ngOnInit(): void {
      this.servicioEventos.getAllEventos().subscribe(eventos => {
        this.eventos = eventos;
      })
  }

}
