/*Laura María Pedraza Gómez* */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmComponent } from '../confirm/confirm.component';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { EventosService } from '../../services/eventos.service';
import { Evento } from '../../interface/evento';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { EventoWebsocketService } from '../../services/evento-websocket.service';
import { FotoCartelEventosService } from '../../services/foto-cartel-eventos.service';
import { WebSocketService } from '../../services/websocket.service';


@Component({
  selector: 'app-nuevo-eventos',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputSwitchModule,
    ConfirmComponent,
    DropdownModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatCardModule, 
  ],
  templateUrl: './nuevo-eventos.component.html',
  styleUrl: './nuevo-eventos.component.css',
  providers:[
    DialogService, 
    MessageService, 
    EventosService, 
    provideNativeDateAdapter()
  ]
})
export class NuevoEventosComponent{
  constructor(
    public messageService:MessageService,
    private servicioEvento: EventosService,
    private router:Router,
  private socket : WebSocketService,
    private servicioFoto: FotoCartelEventosService,
  
  ) {}
  
  @Input() visible: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>();
  value = ''
  validacionNombre = ''
  validacionDescripcion = ''
  validacionHora = ''
  validacionVisibilidad = ''
  validacionFecha = ''

  nuevoEvento : Evento = {
    id: 0,
    nombre: '',
    descripcion: '',
    fecha: '',
    hora: '',
    fotoCartel: '',
    mg: 0,
    numAsistentes: 0,
    visibilidad: false
  }

  formularioFoto: FormData | null = null
  fotoPreview: string | null = null
  
  showDialog() {
    this.visible = true;
  }
  cerrar(): void {
    this.cerrarModal.emit();
  }
  
  uplodadFoto(event: any) {
    const file = event.target.files[0]
    if (file) {
      const permitidas = ['.jpeg', '.jpg', '.png'];
      const fichero = file.name.toLowerCase();
      const extension = fichero.substring(fichero.lastIndexOf('.'));
    
      if (permitidas.includes(extension)) {
      this.formularioFoto = new FormData()
      this.formularioFoto.append('archivo', file)
      this.fotoPreview = URL.createObjectURL(file);
      }else{
        this.messageService.add({ severity: 'warn', summary: 'Subir foto', detail: 'Extensión no valida ', life: 3000 });
        this.formularioFoto=null
      }
    } else {
      this.formularioFoto = null
    }
  }
  limpiarFoto(archivo: any) {
    archivo.value = null
    this.formularioFoto = null
    this.fotoPreview = null
  }
  validarCampos():Boolean{
    let validacion=true
    let fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/
    let horaRegex = /^[0-2][0-9]:[0-5][0-9]$/
   
    if (this.nuevoEvento.nombre){
      if ((this.nuevoEvento.nombre).length<3){
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
    
    if (this.nuevoEvento.descripcion){
      if((this.nuevoEvento.descripcion).length<15){
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

    if(this.nuevoEvento.fecha){
      
      var fechaTest = fechaRegex.test(this.nuevoEvento.fecha)
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
    
    if(this.nuevoEvento.hora){
      var horaTest = horaRegex.test(this.nuevoEvento.hora)
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
  crear(confirm:Boolean){
    if (confirm){
      if(this.validarCampos()){
        if(this.formularioFoto != null){
          this.servicioFoto.uploadFoto(this.formularioFoto).subscribe({
            next:(data:any) => {
              this.nuevoEvento.fotoCartel = data.url
              this.messageService.add({ severity: 'info', summary:'Crear evento', detail:'En curso', life:3000});
              this.servicioEvento.insertEvento(this.nuevoEvento).subscribe({
                next: (data: any) => {
                  setTimeout(() => {
                    this.messageService.add({severity: 'success', summary:'Crear evento', detail:'Completado', life:3000});
                    this.nuevoEvento.id = data.id
                    this.nuevoEvento.nombre= ''
                    this.nuevoEvento.descripcion= ''
                    this.nuevoEvento.fecha= ''
                    this.nuevoEvento.hora=''
                    this.nuevoEvento.fotoCartel= ''
                    this.nuevoEvento.visibilidad= false;
                  });
                  this.nuevoEvento.id=data.id
                 this.socket.sendEvent(this.nuevoEvento)
                 window.location.reload()
                },
                error: (error) => {
                  this.messageService.add({severity: 'error', summary:'Crear evento', detail:'Algo ha ido mal al crear el evento, inténtelo de nuevo', life:3000});
                }
              });
            },
            error: (error) => {
              this.messageService.add({severity: 'error', summary:'Crear evento', detail:'Algo ha ido mal al subir la foto, inténtelo de nuevo', life:3000});
            }
          }); 
        }
      }
    }
  }
}
