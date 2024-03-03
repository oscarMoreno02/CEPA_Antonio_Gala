/**Laura María Pedraza Gómez */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '../../interface/evento';
import { EventosService } from '../../services/eventos.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent implements OnInit{
  constructor(
    private eventoServicio : EventosService,
    private route: ActivatedRoute,
  ) {}

  evento! : Evento
  eventoId!: number;


  ngOnInit(): void {
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.eventoId = +idParam
        this.eventoServicio.getEvento(this.eventoId).subscribe({
          next: (evento: any) => {
            this.evento=evento;
          }
        })
      }
      
  }

}
