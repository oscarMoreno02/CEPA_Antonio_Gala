import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MessageService } from 'primeng/api';
import { Enlace, Seccion } from '../../interface/noticia';
import { Subscription } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { EnlaceService } from '../../services/enlace.service';
//Óscar
@Component({
  selector: 'app-nuevo-enlace',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ConfirmComponent,

  ],
  templateUrl: './nuevo-enlace.component.html',
  styleUrl: './nuevo-enlace.component.css',
  providers:[DialogService, MessageService, EnlaceService]
})
export class NuevoEnlaceComponent implements OnInit {
  constructor(
    private servicioEnlace:EnlaceService,
    private messageService:MessageService
  ){}
  nuevoEnlace:Enlace={}
  enlaceSubscripcion:Subscription=new Subscription
  estiloValidacionTexto=''
  estiloValidacionUrl=''
  @Input() seccion!:Seccion
  @Input() visible: boolean = false;
  @Input() tipo=0
  httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/ ;
  

  ngOnInit(): void {
  }
  showDialog() {
      this.visible = true;
  }
  crear(b:Boolean){
    if(b){

      if(this.validarCampos()){
        this.nuevoEnlace.idSeccion=this.seccion.id
      this.messageService.add({ severity: 'info', summary: 'Crear Enlace', detail: 'En curso', life: 3000 });
      this.servicioEnlace.insertEnlace(this.nuevoEnlace).subscribe({
        next: (data:any) => {
              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Crear Enlace', detail: 'Completada', life: 3000 });
                setTimeout(() => {
                    this.nuevoEnlace.id=data.id
                    this.seccion.enlaces?.push(this.nuevoEnlace)
                    this.nuevoEnlace={}
                    this.visible=false
              }, 1000); 
            }, 1000); 
          
        },
        error: (err) => {
      
          this.messageService.add({ severity:'error', summary: 'Crear Noticia', detail: 'Cancelada', life: 3000 });
        }
      })
    }
  }
  }
  validarCampos():Boolean{

    let valido = true
    if(this.nuevoEnlace.textoClave==undefined){
      this.messageService.add({ severity: 'warn', summary: 'Crear Enlace', detail: 'El campo palabras claves es obligatorio', life: 3000 });
      valido=false
    }else{
      if(this.nuevoEnlace.textoClave.split(' ').join('').length<5){
        this.estiloValidacionTexto='ng-invalid ng-dirty'
        valido=false
        this.messageService.add({ severity: 'warn', summary: 'Crear Enlace', detail: 'Tamaño de palabras claves incorrecto', life: 3000 });
      }else{
        this.estiloValidacionTexto=''
      }
    }
    
    if(this.nuevoEnlace.url==undefined){
      this.estiloValidacionUrl='ng-invalid ng-dirty'
      valido=false
      this.messageService.add({ severity: 'warn', summary: 'Crear Enlace', detail: 'Dirección URL no introducida ', life: 3000 });
    }else{
      if(!this.httpRegex.test(this.nuevoEnlace.url)){
        this.estiloValidacionUrl='ng-invalid ng-dirty'
        valido=false
        this.messageService.add({ severity: 'warn', summary: 'Crear Enlace', detail: 'Dirección URL inválida ', life: 3000 });
      }else{
        this.estiloValidacionUrl=''
      }
    }
   

    return valido
  }


}
