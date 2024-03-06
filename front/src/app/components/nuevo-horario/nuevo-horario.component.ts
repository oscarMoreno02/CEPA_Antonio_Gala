import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MessageService } from 'primeng/api';
import { Enlace, Seccion } from '../../interface/noticia';
import { Subscription, subscribeOn } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { EnlaceService } from '../../services/enlace.service';
import { HorarioService } from '../../services/horario.service';
import { Horario } from '../../interface/horario';
import { Aula } from '../../interface/aula';
import { FranjaService } from '../../services/franja.service';
import { Franja } from '../../interface/franja';
import { DropdownModule } from 'primeng/dropdown';
//Óscar
@Component({
  selector: 'app-nuevo-horario',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ConfirmComponent,
    DropdownModule
  ],
  providers:[DialogService, MessageService, EnlaceService],
  templateUrl: './nuevo-horario.component.html',
  styleUrl: './nuevo-horario.component.css'
})
export class NuevoHorarioComponent implements OnInit {
  constructor(
    private servicioHorario:HorarioService,
    private messageService:MessageService,
    private servicioFranjas:FranjaService
  ){}
  horarioSubscripcion:Subscription=new Subscription
  estiloValidacionFranja=''

  franja?: Franja
  nuevoHorario:Horario={}
  listaFranjas: Array<Franja> = []
  @Input() aula!:Aula
  @Input() visible: boolean = false;
  @Input() tipo=0

  ngOnInit(): void {
    this.horarioSubscripcion=this.servicioFranjas.getAllFranjas().subscribe({
      next:(data:Array<Franja>)=>{
        this.listaFranjas=data
        for (const f of this.listaFranjas){
          f.formateado=f.horaInicio+' - '+f.horaFin
        }
      },
      error:(err)=>{

      }
    })

  }
  showDialog() {
      this.visible = true;
  }
  crear(b:Boolean){
    if(b){

      if(this.validarCampos()){
        this.nuevoHorario.idAula=this.aula.id
        this.nuevoHorario.idFranja=this.franja!.id
      this.messageService.add({ severity: 'info', summary: 'Añadir Horario', detail: 'En curso', life: 3000 });
      this.servicioHorario.insertHorario(this.nuevoHorario).subscribe({
        next: (data:any) => {
              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Añadir Horario', detail: 'Completada', life: 3000 });
                setTimeout(() => {
                    this.nuevoHorario.id=data.id
                    this.nuevoHorario.franja=this.franja
                    this.aula.horarios?.push(this.nuevoHorario)
                    this.nuevoHorario={}
                    this.visible=false
              }, 1000); 
            }, 1000); 
          1
        },
        error: (err) => {
      
          this.messageService.add({ severity:'error', summary: 'Añadir Horario', detail: 'Cancelada', life: 3000 });
        }
      })
    }
  }
  }
  validarCampos():Boolean{

    let valido = true
    if(this.franja==null || this.franja==undefined){
      valido=false
      this.estiloValidacionFranja='ng-invalid ng-dirty'
      this.messageService.add({ severity:'warn', summary: 'Añadir Horario', detail: 'No se ha introducido una franja horaria', life: 3000 });
    }else{
      if(this.validarRegistrados()==false){
        valido=false
          this.estiloValidacionFranja='ng-invalid ng-dirty'
          this.messageService.add({ severity:'warn', summary: 'Añadir Horario', detail: 'Horario ya registrado anteriormente', life: 3000 });
       }else{
        this.estiloValidacionFranja=''
       }
       if(this.validarFranja()==false){
        valido=false
          this.estiloValidacionFranja='ng-invalid ng-dirty'
          this.messageService.add({ severity:'warn', summary: 'Añadir Horario', detail: 'Franja en conflicto con otra en uso', life: 3000 });
       }else{
        this.estiloValidacionFranja=''
       }
    }
  

    return valido
  }
validarRegistrados():boolean{
let valido = true

  if(this.aula.horarios){
    for (const f of this.aula.horarios){
      if(f.franja!.id==this.franja!.id){
          valido = false
      }
      
    }
  }

return valido
}

validarFranja(): boolean {
  let valido = true;

  if (this.aula.horarios) {
    for (const f of this.aula.horarios) {
      if ((f.franja!.horaInicio < this.franja!.horaFin && this.franja!.horaFin <= f.franja!.horaFin) ||
          (f.franja!.horaInicio <= this.franja!.horaInicio && this.franja!.horaInicio < f.franja!.horaFin)) {
        valido = false;
        break;
      }
    }
  }

  return valido;
}
}
