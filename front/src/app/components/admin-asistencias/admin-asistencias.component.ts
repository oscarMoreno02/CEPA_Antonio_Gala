/*Laura María Pedraza Gómez* */
import { ToastModule } from 'primeng/toast';
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


@Component({
  selector: 'app-admin-asistencias',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ConfirmComponent,
    DialogModule
  ],
  templateUrl: './admin-asistencias.component.html',
  styleUrl: './admin-asistencias.component.css',
  providers: [MessageService, AsistenciaService, DialogService, provideNativeDateAdapter()]
})
export class AdminAsistenciasComponent implements OnInit {
  usuarios: Array<Users> = []
  @Input() id!:number

  constructor(private asistenciaServicio : AsistenciaService){}

  ngOnInit(): void {
    this.asistenciaServicio.getAsistenciasEvento(this.id).subscribe({
      next:(usuarios:any)=>{
        this.usuarios=usuarios;
        console.log("Llegan los usuarios",usuarios)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  @Input() visible: boolean = false

  showDialog(){
    this.visible=true
  }

  @Output() cerrarModal = new EventEmitter<void>();
  cerrar(): void {
    this.cerrarModal.emit();
  }
  
}
