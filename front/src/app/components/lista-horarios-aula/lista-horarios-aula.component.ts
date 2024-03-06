import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NuevaCategoriaComponent } from '../nueva-categoria/nueva-categoria.component';
import { EditarCategoriaComponent } from '../editar-categoria/editar-categoria.component';
import { AulaService } from '../../services/aula.service';
import { NuevaAulaComponent } from '../nueva-aula/nueva-aula.component';
import { EditarAulaComponent } from '../editar-aula/editar-aula.component';
import { NuevaFranjaComponent } from '../nueva-franja/nueva-franja.component';
import { EditarFranjaComponent } from '../editar-franja/editar-franja.component';
import { HorarioService } from '../../services/horario.service';
import { Aula } from '../../interface/aula';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NuevoHorarioComponent } from '../nuevo-horario/nuevo-horario.component';
//Óscar
@Component({
  selector: 'app-lista-horarios-aula',
  standalone: true,
  imports: [ 
    HttpClientModule,
    RouterLink,
    TableModule,
    ButtonModule,
    NuevaCategoriaComponent,
    EditarCategoriaComponent,
    NuevaAulaComponent,
    EditarAulaComponent,
    NuevaFranjaComponent,
    EditarFranjaComponent,
    ConfirmComponent,
    ToastModule,
    NuevoHorarioComponent
  ],
  providers:[HorarioService,MessageService],
  templateUrl: './lista-horarios-aula.component.html',
  styleUrl: './lista-horarios-aula.component.css'
})
export class ListaHorariosAulaComponent implements OnInit {
  constructor(    
    private servicioHorario:HorarioService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private servicioAulas:AulaService,
    private messageService:MessageService
    ){}
    subscripcionHorarios: Subscription=new Subscription;
    
    idAula = this.rutaActiva.snapshot.params['id']
    aula:Aula={nombre:''}
    
    ngOnInit(): void {
  
      this.subscripcionHorarios = this.servicioAulas.getAulaWithData(this.idAula).subscribe({
        next: (data: Aula) => {
          this.aula=data
        
        },
        error: (err) => {
        }

      });
    }
    eliminar(b: Boolean,id:number) {

      if (b) {
  
        this.messageService.add({ severity: 'info', summary: 'Borrar Horario', detail: 'En curso', life: 3000 });
      
        this.servicioHorario.deleteHorario(id).subscribe({
          next: (u: any) => {
     
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Borrar Horario', detail: 'Completada', life: 3000 });
              setTimeout(() => {
                
                this.aula.horarios=this.aula.horarios!.filter(data => data.id !== id);
                
              }, 1000);
            }, 1000);
  
          },
          error: (err) => {
          
            this.messageService.add({ severity: 'error', summary: 'Borrar Horario', detail: 'Cancelada', life: 3000 });
          }
        })
  
      }
    }
}
