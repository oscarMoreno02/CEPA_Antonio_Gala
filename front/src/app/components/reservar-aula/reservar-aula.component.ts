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
//Óscar
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
export class ReservarAulaComponent implements OnInit {
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
          this.evaluarFechas()
         
        },
        error: (err) => {
        }

      });
    }
  
    reservar(b: Boolean,id:number) {
      if (b) {
        this.messageService.add({ severity: 'info', summary: 'Reservar Horario', detail: 'En curso', life: 3000 });
        let reserva:Reserva=  {fecha:this.year+'-'+this.month+'-'+this.day,idAula:this.idAula,idHorario:id,idProfesor:this.authService.getUid()}
       
        this.servicioReserva.insertReserva(reserva).subscribe({
          next: (u: any) => {
          
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Reservar Horario', detail: 'Completada', life: 3000 });
              setTimeout(() => {
               for(const h of this.horarios){
                if(h.id==id){
                  h.reservado=reserva
                  this.evaluarFechas()
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
                        this.evaluarFechas()
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
      this.evaluarFechas()
    }

    nuevaFecha(date:Date){
  
      this.day=date.getDate()
      this.month=date.getMonth()+1
      this.year=date.getFullYear()
    }

    evaluarFechas=()=>{

      for(let i =0;i<this.horarios.length;i++){
        if(this.horarios[i].reservado!=null ){

          this.horarios[i].reservado!.estado=this.checkVencimiento( this.horarios[i].reservado!.fecha, this.horarios[i].franja!.horaInicio, this.horarios[i].franja!.horaFin)
            
        }
      }
    }
    checkVencimiento=(fechaString:string,horarioInicio:string,horarioFin:string): number=>{
  
      let estado=0
      let partesFecha = fechaString.split('-');
      let año = parseInt(partesFecha[0], 10);
      let mes = parseInt(partesFecha[1], 10) - 1;
      let dia = parseInt(partesFecha[2], 10);
      let partesHoraInicio = horarioInicio.split(':'); 
  
       let horas = parseInt(partesHoraInicio[0], 10);
      let minutos = parseInt(partesHoraInicio[1], 10);
      let segundos = parseInt(partesHoraInicio[2], 10);
  
      let fechaInicio=new Date(año,mes,dia,horas,minutos)
  
      let partesHoraFin = horarioInicio.split(':'); 
  
       horas = parseInt(partesHoraFin[0], 10);
     minutos = parseInt(partesHoraFin[1], 10);
      segundos = parseInt(partesHoraFin[2], 10);
      
      let fechaFin=new Date(año,mes,dia,horas,minutos)
      if(this.fecha>fechaInicio ){
        if(this.fecha>fechaFin){
          estado=1
        }else{
            estado=2
        }
      }
  
      return estado
    }
}
