/*Laura María Pedraza Gómez* */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EventosService } from '../../services/eventos.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Evento } from '../../interface/evento';
import { AsistenciaService } from '../../services/asistencia.service';
import { Usuario } from '../../interface/usuario';
import { Users } from '../../interface/users';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmComponent } from '../confirm/confirm.component';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import {provideNativeDateAdapter} from '@angular/material/core';
import { NuevoAsistenteEventoComponent } from "../nuevo-asistente-evento/nuevo-asistente-evento.component";
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-admin-asistencias',
    standalone: true,
    templateUrl: './admin-asistencias.component.html',
    styleUrl: './admin-asistencias.component.css',
    providers: [MessageService, AsistenciaService, DialogService, provideNativeDateAdapter()],
    imports: [
        FormsModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        ConfirmComponent,
        DialogModule,
        NuevoAsistenteEventoComponent,
        ToastModule
    ]
})
export class AdminAsistenciasComponent implements OnInit {
  usuarios: Array<any> = [];
  eventoId!: number;

  constructor(
    private asistenciaServicio: AsistenciaService, 
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.eventoId = +idParam;
      this.asistenciaServicio.getAsistenciasEvento(this.eventoId).subscribe({
        next: (eventos: any) => {
          for (var i =   0; i < eventos.length; i++) {
            this.usuarios.push(eventos[i].usuario);
          }
          console.log("Llegan los usuarios", this.usuarios);
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.error('El parámetro id es requerido');
    }
  }

  eliminar(b:Boolean){

  }
  
}
