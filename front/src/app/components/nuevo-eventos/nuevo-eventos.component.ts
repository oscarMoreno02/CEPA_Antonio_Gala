
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
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';


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
    MatDatepickerModule
  ],
  templateUrl: './nuevo-eventos.component.html',
  styleUrl: './nuevo-eventos.component.css',
  providers:[
    DialogService, 
    MessageService, 
    EventosService, 
    provideNativeDateAdapter()]
})
export class NuevoEventosComponent implements OnInit{
  constructor(
    public messageService:MessageService,
    private servicioEvento: EventosService,
    private router:Router,
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  @Input() visible: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>();
  value = ''
  validacionNombre = ''
  validacionDescripcion = ''
  validacionHora = ''
  validacionVisibilidad = ''

  nuevoEvento : Evento = {
    id: null,
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
  
  showDialog() {
    this.visible = true;
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
  validarCampos():Boolean{
    let validacion=true
    let fechaRegex 
   
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


    
    return validacion
  }
  crear(b:Boolean){
    if (b){
      if(this.validarCampos()){

      }
    }
  }

}
