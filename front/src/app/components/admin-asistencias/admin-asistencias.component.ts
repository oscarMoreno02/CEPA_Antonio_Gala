/*Laura María Pedraza Gómez* */
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AsistenciaService } from '../../services/asistencia.service';
import { Usuario } from '../../interface/usuario';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmComponent } from '../confirm/confirm.component';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import {provideNativeDateAdapter} from '@angular/material/core';
import { NuevoAsistenteEventoComponent } from "../nuevo-asistente-evento/nuevo-asistente-evento.component";
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from '../../services/eventos.service';

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
  usuarios: Array<Usuario> = [];
  asistencias:Array<any> = [];
  eventoId!: number;

  constructor(
    private asistenciaServicio: AsistenciaService, 
    private route: ActivatedRoute,
    private messageService:MessageService,
    private eventoServicio: EventosService
    ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.eventoId = +idParam
      this.asistenciaServicio.getAsistenciasEvento(this.eventoId).subscribe({
        next: (asistencias: any) => {
          for (var i =   0; i < asistencias.length; i++) {
            this.usuarios.push(asistencias[i].usuario);
          }
          this.asistencias = asistencias
        },
      });
    } 
  }

  async eliminar(id: number, confirm:Boolean) {
    if (confirm){
      var idAsistencia: number;
      var asistenciasActualizadas = [];
      var usuariosActualizados = [];

      for (var i =  0; i < this.asistencias.length; i++) {
          if (this.asistencias[i].usuario.id == id) {
              idAsistencia = this.asistencias[i].id;
          } else {
              asistenciasActualizadas.push(this.asistencias[i]);
          }
      }

      for (var i =  0; i < this.usuarios.length; i++) {
          if (this.usuarios[i].id != id) {
              usuariosActualizados.push(this.usuarios[i]);
          }
      }

      this.asistencias = asistenciasActualizadas;
      this.usuarios = usuariosActualizados;

      this.eventoServicio.putPlaza(this.eventoId).subscribe({
        next:(data:any) => {
          this.asistenciaServicio.deleteAsistencia(idAsistencia).subscribe({
            next: (data: any) => {
                setTimeout(() => {
                    this.messageService.add({ severity: 'success', summary: 'Eliminar asistencia', detail: 'Completada', life:  3000 })
                },  1000)
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Eliminar asistencia', detail: 'Error al eliminar la asistencia, inténtelo de nuevo', life:  3000 });
            }
        });
        }
      })
    }
  }
}
