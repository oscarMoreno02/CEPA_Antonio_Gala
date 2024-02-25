import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
import { Horario } from '../../interface/horario';
import { FechaReservasComponent } from '../fecha-reservas/fecha-reservas.component';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';
import { Reserva } from '../../interface/reserva';
@Component({
  selector: 'app-reservar-aula',
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
    NuevoHorarioComponent,
    FechaReservasComponent
  ],
  templateUrl: './reservar-aula.component.html',
  styleUrl: './reservar-aula.component.css'
})
export class ReservarAulaComponent implements OnInit, OnChanges {
  constructor(    
    private servicioHorario:HorarioService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private servicioReserva:ReservaService,
    private messageService:MessageService,
    public authService:AuthService
    ){}
    subscripcionHorarios: Subscription=new Subscription;
    
    idAula = this.rutaActiva.snapshot.params['id']
    horarios:Array<Horario>=[]
    fecha=new Date()
       @Input() day=this.fecha.getDate()
      @Input() month=this.fecha.getMonth()+1
     @Input()  year = this.fecha.getFullYear()
    ngOnInit(): void {
    
      this.subscripcionHorarios = this.servicioHorario.getAllHorariosOfAulaWithReservas(this.idAula,this.day,this.month,this.year).subscribe({
        next: (data: Array<Horario>) => {
          this.horarios=data
          console.log(data)
        },
        error: (err) => {
        }

      });
    }
    ngOnChanges(changes: SimpleChanges): void {
      console.log(changes)
      if(changes["day"]){

        console.log("dia cambia")
      }
    }
    reservar(b: Boolean,id:number) {
      if (b) {
        this.messageService.add({ severity: 'info', summary: 'Reservar Horario', detail: 'En curso', life: 3000 });
        let reserva:Reserva=  {fecha:this.year+'-'+this.month+'-'+this.day,idAula:this.idAula,idHorario:id,idProfesor:this.authService.getUid()}
       console.log(reserva)
        this.servicioReserva.insertReserva(reserva).subscribe({
          next: (u: any) => {
            console.log(u)
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Reservar Horario', detail: 'Completada', life: 3000 });
              setTimeout(() => {
               for(const h of this.horarios){
                if(h.id==id){
                  h.reservado=reserva
                }
               }
              }, 1000);
            }, 1000);
  
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Reservar Horario', detail: 'Cancelada', life: 3000 });
          }
        })
  
      }
    }
    eliminar(b:boolean,id:number){
      if(b){

        this.messageService.add({ severity: 'info', summary: 'Anular Reserva', detail: 'En curso', life: 3000 });
        this.servicioReserva.deleteReserva(id).subscribe({
        next:(data:any)=>{
          setTimeout(() => {
                  this.messageService.add({ severity: 'success', summary: 'Anular Reserva', detail: 'Completado', life: 3000 });
                  setTimeout(() => { 
                    for(const h of this.horarios){

                      if(h.reservado?.id==id){
                        h.reservado=null
             
                      }
                     }
                 
                }, 1000);
              }, 1000); 
        },
          error: (err) => {
            this.messageService.add({ severity:'error', summary: 'Anular Reserva', detail: 'Cancelado', life: 3000 });
          }
      })
    }
  }
    nuevosHorarios(horarios:Array<Horario>){

      this.horarios=horarios
    }
}
