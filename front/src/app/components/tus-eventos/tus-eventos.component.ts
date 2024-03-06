/**Laura María Pedraza Gómez */
import { ChangeDetectorRef, Component, EventEmitter, Output, ViewEncapsulation, OnInit } from '@angular/core';
import { ConfirmComponent } from "../confirm/confirm.component";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { EventosService } from '../../services/eventos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenciaService } from '../../services/asistencia.service';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-tus-eventos',
    standalone: true,
    templateUrl: './tus-eventos.component.html',
    styleUrl: './tus-eventos.component.css',
    imports: [
      ConfirmComponent,
      TableModule,
      ButtonModule,
      ToastModule
    ],
    providers:[
      MessageService,
      EventosService
    ],
    encapsulation:ViewEncapsulation.None
    
})
export class TusEventosComponent implements OnInit {

  eventos:Array<any> = []
  asistencias:Array<any>=[]
  idUsuario:number = 0

  constructor(
    private servicioEventos : EventosService,
    private servicioAsistencias: AsistenciaService,
    private router:Router,
    private route: ActivatedRoute,
    private messageService:MessageService,
    ){}
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam){
      this.idUsuario = +idParam

      this.servicioAsistencias.getAsistenciasUsuario(this.idUsuario).subscribe({
        next: (asistencias:any) => {
          for (var i = 0; i<asistencias.length ; i++){
            this.eventos.push(asistencias[i].evento)
          }  
          this.asistencias=asistencias
        }
      })
      
    }
  }

  idAsistencia:number = 0

  eliminar(eventoId:number, confirm:Boolean){
    if (confirm){
      
      for (var i=0 ; i<this.asistencias.length ; i++){
        if (this.asistencias[i].evento.id== eventoId){
          this.idAsistencia = this.asistencias[i].id
        }
      }
      this.servicioEventos.putPlaza(eventoId).subscribe({
        next:(data:any)=> {
          this.servicioAsistencias.deleteAsistencia(this.idAsistencia).subscribe({
            next:(data:any)=> {
            location.reload()
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Eliminar asistencia', detail: 'Completada', life:  3000 })
          },  1000)
            },
            error: (err) => {
              this.messageService.add({ severity: 'error', summary: 'Eliminar asistencia', detail: 'Error al eliminar la asistencia, inténtelo de nuevo', life:  3000 });
          }
          })
        }
      })
      
    }
  }

}
