/**Laura María Pedraza Gómez */
import { Component, OnInit } from '@angular/core';
import { ConfirmComponent } from "../confirm/confirm.component";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Evento } from '../../interface/evento';
import { MessageService } from 'primeng/api';
import { EventosService } from '../../services/eventos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenciaService } from '../../services/asistencia.service';
import { environment } from '../../../environments/environment.development';

@Component({
    selector: 'app-tus-eventos',
    standalone: true,
    templateUrl: './tus-eventos.component.html',
    styleUrl: './tus-eventos.component.css',
    imports: [
      ConfirmComponent,
      TableModule,
      ButtonModule
    ],
    providers:[
      MessageService,
      EventosService
    ]
    
})
export class TusEventosComponent implements OnInit {

  eventos:Array<Evento> = []
  idUsuario:number = 0

  constructor(
    private servicioEventos : EventosService,
    private servicioAsistencias: AsistenciaService,
    private router:Router,
    private route: ActivatedRoute
    ){}
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam){
      this.idUsuario = +idParam
      console.log(this.idUsuario)
      this.servicioAsistencias.getAsistenciasUsuario(this.idUsuario).subscribe({
        next: (eventos:any) => {
          for (var i = 0; i<eventos.length ; i++){
            this.eventos.push(eventos[i].evento)
          }
          
        }
      })
      
    }
  }

  eliminar(confirm:Boolean){
    if (confirm){

    }
  }

}
