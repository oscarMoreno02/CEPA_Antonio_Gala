import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NuevaCategoriaComponent } from '../nueva-categoria/nueva-categoria.component';
import { EditarCategoriaComponent } from '../editar-categoria/editar-categoria.component';
import { AulaService } from '../../services/aula.service';
import { Aula } from '../../interface/aula';
import { NuevaAulaComponent } from '../nueva-aula/nueva-aula.component';
import { EditarAulaComponent } from '../editar-aula/editar-aula.component';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../interface/reserva';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ToastModule } from 'primeng/toast';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
//Óscar

@Component({
  selector: 'app-lista-reservas',
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
    ConfirmComponent,
    ToastModule
  ],
  providers:[AulaService,MessageService],
  templateUrl: './lista-reservas.component.html',
  styleUrl: './lista-reservas.component.css'
})
export class ListaReservasComponent implements OnInit {
  constructor(    
    private servicioReservas:ReservaService,
    private router: Router,
    private rutaActiva:ActivatedRoute ,
    private messageService:MessageService,
    public authService:AuthService
    ){}
    subscripcionReservas: Subscription=new Subscription;
    listaReservas:Array<Reserva>=[]
    id = this.rutaActiva.snapshot.params['id']
    fecha =new Date()
    dia=this.fecha.getDate()
    mes=this.fecha.getMonth()
    minutos=this.fecha.getMinutes()
    segundos=this.fecha.getSeconds()
    hora=this.fecha.getHours()
    year=this.fecha.getFullYear()
    fechaFormateada=this.year.toString()+'-'+this.mes.toString()+'-'+this.dia.toString()
  
    ngOnInit(): void {

        if(this.id!=undefined){
          this.subscripcionReservas = this.servicioReservas.getAllReservasByClaseWithData(this.id).subscribe({
            next: (data: Array<Reserva>) => {
              this.listaReservas=data
              this.evaluarFechas()
            },
            error: (err) => {
            }
          });
        }else{
          let acceso=this.authService.getAccess
          if(acceso=='profesor'){
            this.id=this.authService.getUid()
           
            this.subscripcionReservas = this.servicioReservas.getAllReservasByProfesorWithData(this.id).subscribe({
              next: (data: Array<Reserva>) => {
                this.listaReservas=data
                this.evaluarFechas()
        
              },
              error: (err) => {
              }
            });
          }else{

            this.subscripcionReservas = this.servicioReservas.getAllReservasWithData().subscribe({
              next: (data: Array<Reserva>) => {
                this.listaReservas=data
                this.evaluarFechas()
             
              },
              error: (err) => {
              }
            });
          }
        }
    }
    eliminar(confirm:Boolean,id:number){
      if(confirm){

        this.messageService.add({ severity: 'info', summary: 'Anular Reserva', detail: 'En curso', life: 3000 });
        this.servicioReservas.deleteReserva(id).subscribe({
        next:(data:any)=>{
          setTimeout(() => {
                  this.messageService.add({ severity: 'success', summary: 'Anular Reserva', detail: 'Completado', life: 3000 });
                  setTimeout(() => { 
                    this.listaReservas=this.listaReservas.filter(data => data.id !== id);
                    
                  }, 1000);
                }, 1000); 
              },
              error: (err) => {
                this.messageService.add({ severity:'error', summary: 'Anular Reserva', detail: 'Cancelado', life: 3000 });
              }
            })
          }
        }

  evaluarFechas=()=>{
    for(let i =0;i<this.listaReservas.length;i++){
      this.listaReservas[i].estado=this.checkVencimiento( this.listaReservas[i].fecha, this.listaReservas[i].horario!.franja!.horaInicio, this.listaReservas[i].horario!.franja!.horaFin)
    }
  }
  //Estado 0 => pendiente  1=> Vencido  2=> En curso
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
