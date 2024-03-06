import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { AulaService } from '../../services/aula.service';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { Franja } from '../../interface/franja';
import { FranjaService } from '../../services/franja.service';
//Óscar
@Component({
  selector: 'app-nueva-franja',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ConfirmComponent,
   DropdownModule,
  ],
  providers:[DialogService, MessageService, AulaService],
  templateUrl: './nueva-franja.component.html',
  styleUrl: './nueva-franja.component.css'
})
export class NuevaFranjaComponent implements OnInit {

  constructor(
    public messageService: MessageService,
    private servicioFranja: FranjaService,
    private router: Router,
   
  ) { }
  horaInicio={hora:{valor:'00',numero:0},minuto:{valor:'00',numero:0}}
  horaFin={hora:{valor:'00',numero:0},minuto:{valor:'00',numero:0}}
  horas=[{valor:'00',numero:0}]
  minutos=[{valor:'00',numero:0}]
  turnosDisponibles=[{nombre:'Diurno'},{nombre:'Nocturno'}]
  turnoElegido={nombre:'Diurno'}
  nuevaFranja:Franja={horaInicio:'',horaFin:'',turno:''}
  listaFranjas:Array<Franja>=[]
  estiloValidacionHoras=''
  estiloValidacionMinutos=''
  estiloValidacioneTurno=''
  @Input() visible: boolean = false;
  @Input() tipo=0
  subscripcionFranjas: Subscription=new Subscription;
  showDialog() {
      this.visible = true;
  }
  ngOnInit(): void {
    let listaHoras=[]
    for (let i=0;i<24;i++){
      let v=i.toString()
      if(i<10){
        v='0'+i
      }
      listaHoras.push({valor:v,numero:i})
    }
    this.horas=listaHoras
    let listaMinutos=[]

    for (let i=0;i<60;i++){
      let v=i.toString()
      if(i<10){
        v='0'+i
      }
      listaMinutos.push({valor:v,numero:i})
    }
    this.minutos=listaMinutos
      this.subscripcionFranjas = this.servicioFranja.getAllFranjas().subscribe({
        next: (data: Array<Franja>) => {
          this.listaFranjas=data
        },
        error: (err) => {
        }

      });
   
  }
  crear(b:Boolean){
    if(b){

      if(this.validarCampos()){
        this.nuevaFranja.horaFin=this.horaFin.hora.valor+':'+this.horaFin.minuto.valor
        this.nuevaFranja.horaInicio=this.horaInicio.hora.valor+':'+this.horaInicio.minuto.valor
        this.nuevaFranja.turno=this.turnoElegido.nombre
        if(this.comprobrarRegistradas()){

          this.messageService.add({ severity: 'info', summary: 'Crear Franja', detail: 'En curso', life: 3000 });
          this.servicioFranja.insertFranja(this.nuevaFranja).subscribe({
            next: (data:any) => {
              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Crear Franja', detail: 'Completada', life: 3000 });
                setTimeout(() => {
                  window.location.reload()
                }, 1000); 
              }, 1000); 
              
            },
            error: (err) => {
              
              this.messageService.add({ severity:'error', summary: 'Crear Franja', detail: 'Cancelada', life: 3000 });
            }
          })
        }else{
          this.messageService.add({ severity: 'warn', summary: 'Crear Franja', detail: 'Horarios de franja ya registrados anteriormente', life: 3000 });
        }
    }
  }
  }
  validarCampos():Boolean{

    let valido = true
    if(this.horaInicio.hora==null || this.horaFin.hora==null){
      this.estiloValidacionHoras='ng-invalid ng-dirty'
        valido=false
        this.messageService.add({ severity: 'warn', summary: 'Crear Franja', detail: 'Horas introdudas incorrectamente', life: 3000 });
    }
    if(this.horaInicio.minuto==null || this.horaFin.minuto==null){
      this.estiloValidacionHoras='ng-invalid ng-dirty'
        valido=false
        this.messageService.add({ severity: 'warn', summary: 'Crear Franja', detail: 'Minutos introducidos incorrectamente', life: 3000 });
    }
      if(this.horaInicio.hora.numero>this.horaFin.hora.numero){
        this.estiloValidacionHoras='ng-invalid ng-dirty'
        valido=false
        this.messageService.add({ severity: 'warn', summary: 'Crear Franja', detail: 'Horas introdudas incorrectamente', life: 3000 });
      }else{
        if(this.horaInicio.hora.numero==this.horaFin.hora.numero && this.horaInicio.minuto.numero>this.horaFin.minuto.numero){
          this.estiloValidacionMinutos='ng-invalid ng-dirty'
          valido=false
          this.messageService.add({ severity: 'warn', summary: 'Crear Franja', detail: 'Minutos introdudos incorrectamente', life: 3000 });
        }else{
          if(this.horaInicio.hora.numero==this.horaFin.hora.numero && this.horaInicio.minuto.numero==this.horaFin.minuto.numero){
            this.estiloValidacionMinutos='ng-invalid ng-dirty'
            valido=false
            this.messageService.add({ severity: 'warn', summary: 'Crear Franja', detail: 'Minutos introdudos incorrectamente', life: 3000 });
          }else{
            this.estiloValidacionMinutos=''
            this.estiloValidacionHoras=''
          }
        }
      }
      if(valido){
        if(this.turnoElegido==null){
          this.estiloValidacioneTurno='ng-invalid ng-dirty'
          this.messageService.add({ severity: 'warn', summary: 'Crear Franja', detail: 'Debe de elegir un turno para esta franja', life: 3000 });
        }else{
          this.estiloValidacioneTurno=''
        }
      }
    
    return valido
  }
  comprobrarRegistradas():boolean{
    let valido = true
    let i = 0
    while(i<this.listaFranjas.length && valido==true){

      if(this.nuevaFranja.horaInicio==this.listaFranjas[i].horaInicio.substring(0, 5) && 
        this.nuevaFranja.horaFin==this.listaFranjas[i].horaFin.substring(0, 5)){
  
          valido=false
      }
      i++
    }
    return valido
  }
}
