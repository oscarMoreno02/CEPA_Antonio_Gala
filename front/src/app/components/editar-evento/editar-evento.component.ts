import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmComponent } from '../confirm/confirm.component';
import { EventosService } from '../../services/eventos.service';
import { Evento } from '../../interface/evento';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ConfirmComponent,
  ],
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css',
  providers: [DialogService, MessageService, EventosService, provideNativeDateAdapter()]
})
export class EditarEventoComponent implements OnInit{
  
  
  constructor(
    private servicioEvento : EventosService,
    private messageService:MessageService
  ){}
  @Input() eventos?: any 
  @Input() tipo=0
  @Input()
  id!: number;
  @Input() visible: boolean = false
  @Output() cerrarModal = new EventEmitter<void>();
  evento!: Evento;

  validacionNombre = ''
  validacionDescripcion = ''
  validacionHora = ''
  validacionVisibilidad = ''
  validacionFecha = ''

  
  eventoModal : Evento = {
    id: 0,
    nombre: '',
    descripcion: '',
    fecha: '',
    hora: '',
    fotoCartel: '',
    mg: 0,
    visibilidad: false
  }

  formularioFoto: FormData | null = null
  fotoPreview: string | null = null

  
  validarCampos():Boolean{
    let validacion=true
    let fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/
    let horaRegex = /^[0-2][0-9]:[0-5][0-9]$/
   
    if (this.eventoModal.nombre){
      if ((this.eventoModal.nombre).length<3){
        this.validacionNombre = 'ng-invalid ng-dirty'
        validacion = false
        this.messageService.add({ severity: 'warn', summary: 'Crear Evento', detail: 'El nombre debe de contener al menos 3 caracteres', life: 3000 })
      } else {
        this.validacionNombre = ''
      }
    } else {
      this.validacionNombre = 'ng-invalid ng-dirty'
      this.messageService.add({ severity: 'warn', summary: 'Crear Evento', detail: 'El nombre del evento es obligatorio', life: 3000 });
      validacion = false
    }
    
    if (this.eventoModal.descripcion){
      if((this.eventoModal.descripcion).length<15){
        this.validacionDescripcion='ng-invalid ng-dirty'
        validacion = false
        this.messageService.add({ severity: 'warn', summary:'Crear Evento', detail:'La descripción debe de contener al menos 15 caracteres', life:3000})
      } else {
        this.validacionDescripcion = ''
      }
    } else {
      this.validacionDescripcion = 'ng-invalid ng-dirty'
      validacion=false
      this.messageService.add({severity: 'warn', summary:'Crear Evento', detail:'La descripcion del evento es obligatoria', life:3000})
    }

    if(this.eventoModal.fecha){
      
      var fechaTest = fechaRegex.test(this.eventoModal.fecha)
      if (fechaTest == false){
        this.validacionFecha = 'ng-invalid ng-dirty'
        validacion=false
        this.messageService.add({severity: 'warn', summary:'Crear Evento', detail:'La fecha debe de tener formato DD/MM/YYYY', life:3000})
      } else {
        this.validacionFecha = ''
      }
    } else {
      this.validacionFecha = 'ng-invalid ng-dirty'
      validacion = false
      this.messageService.add({severity: 'warn', summary:'Crear Evento', detail:'La fecha del evento es obligatoria', life:3000})
    }
    
    if(this.eventoModal.hora){
      var horaTest = horaRegex.test(this.eventoModal.hora)
        if (horaTest==false){
          this.validacionHora = 'ng-invalid ng-dirty'
          validacion=false
          this.messageService.add({severity:'warn', summary:'Crear Evento', detail:'La hora del evento debe de estar completa', life:3000})
        } else {
          this.validacionHora=''
        }
      } else {
        this.validacionHora = 'ng-invalid ng-dirty'
        validacion = false
        this.messageService.add({severity:'warn', summary:'Crear Evento', detail:'La hora del evento es obligatoria', life:3000})
      }
    return validacion
  }
  cerrar(): void {
    this.cerrarModal.emit();
  }
  uplodadFoto(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.formularioFoto = new FormData()
      this.formularioFoto.append('archivo', file)
      this.fotoPreview = URL.createObjectURL(file);
      console.log(this.formularioFoto)
    } else {
      this.formularioFoto = null
    }
  }
  limpiarFoto(archivo: any) {
    archivo.value = null
    this.formularioFoto = null
    this.fotoPreview = null
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  showDialog() {
    this.servicioEvento.getEvento(this.id!).subscribe({
      
      next: (ev:Evento) => {
        this.evento=ev
          this.visible = true;
          this.eventoModal.nombre = ev.nombre
          this.eventoModal.descripcion = ev.descripcion
          this.eventoModal.fecha = ev.fecha
          this.eventoModal.hora = ev.hora
          this.eventoModal.visibilidad = ev.visibilidad
          this.eventoModal.fotoCartel = ev.fotoCartel
      },
      error: (err) => {
        console.log(err)
      }  
    })
  }
  async guardar(b:Boolean){
    if(b){
      if(this.validarCampos()){
         this.servicioEvento.updateEvento(this.eventoModal, this.id).subscribe({
          next: (data:any)=> {
            setTimeout(()=>{
              this.messageService.add({severity:'success', summary:'Actualizar evento', detail:'Completada', life:3000})
              for(let i=0;i<this.eventos.length;i++){
                if(this.eventos[i].id == this.eventoModal.id){
                  this.eventos[i]=this.evento
                  this.visible=false
                }
              }
            }, 1000)
          },
          error: (err) => {
            console.log(err)
            this.messageService.add({ severity:'error', summary: 'Actualizar evento', detail: 'Error al actualizar el evento, inténtelo de nuevo', life: 3000 });
          }
        })
      }
    }
  }
  async eliminar(b:Boolean){
     this.servicioEvento.deleteEvento(this.id).subscribe({
      next:(data: any) => {
        setTimeout(()=>{
          this.messageService.add({severity:'success', summary:'Eliminar evento', detail:'Completada', life:3000})
          for(let i=0;i<this.eventos.length;i++){
            if(this.eventos[i].id == this.eventoModal.id){
            this.eventos[i]=this.evento
            this.visible=false
          }
        }
      }, 1000)
    },
    error: (err) => {
      console.log(err)
      this.messageService.add({ severity:'error', summary: 'Eliminar evento', detail: 'Error al eliminar el evento, inténtelo de nuevo', life: 3000 });
    }
    })
  }
 
}