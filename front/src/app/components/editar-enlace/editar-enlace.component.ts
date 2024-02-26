import { Component, Input, OnInit } from '@angular/core';
import { EnlaceService } from '../../services/enlace.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Enlace, Seccion } from '../../interface/noticia';
import { DialogService } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmComponent } from '../confirm/confirm.component';
//Óscar
@Component({
  selector: 'app-editar-enlace',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ConfirmComponent,
  ],
  templateUrl: './editar-enlace.component.html',
  styleUrl: './editar-enlace.component.css',
  providers:[DialogService, MessageService, EnlaceService]
})
export class EditarEnlaceComponent implements OnInit {
  constructor(
    private servicioEnlace:EnlaceService,
    private messageService:MessageService
  ){}
  editarEnlace:Enlace={}
  enlaceSubscripcion:Subscription=new Subscription
  estiloValidacionTexto=''
  estiloValidacionUrl=''
  @Input() id?=0
  @Input() seccion!:Seccion
  @Input() visible: boolean = false;
  @Input() tipo=0
  httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/ ;

  ngOnInit(): void {

    this.enlaceSubscripcion=this.servicioEnlace.getEnlace(this.id!).subscribe({
      next:(data : Enlace)=>{
        this.editarEnlace=data
      },
      error:(err)=>{
 
      }
    })
  }
  showDialog() {
    this.enlaceSubscripcion=this.servicioEnlace.getEnlace(this.id!).subscribe({
      next:(data : Enlace)=>{
        this.editarEnlace=data
        this.visible = true;
      },
      error:(err)=>{

      }
    })
  }
  guardar(b:Boolean){
    if(b){

      if(this.validarCampos()){
        this.editarEnlace.idSeccion=this.seccion.id
      this.messageService.add({ severity: 'info', summary: 'Actualizar Enlace', detail: 'En curso', life: 3000 });
      this.servicioEnlace.updateEnlace(this.editarEnlace).subscribe({
        next: (data:any) => {
          this.visible=false
              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Actualizar Enlace', detail: 'Completado', life: 3000 });
                for(let i=0;i<this.seccion.enlaces!.length;i++){
                  if(this.editarEnlace.id==this.seccion.enlaces![i].id){
                 
                    this.seccion.enlaces![i]=this.editarEnlace
                  }
                 }
            }, 1000); 
          
        },
        error: (err) => {
       
          this.messageService.add({ severity:'error', summary: 'Actualizar Noticia', detail: 'Cancelado', life: 3000 });
        }
      })
    }
  }
  }
  eliminar(b:Boolean){
    this.messageService.add({ severity: 'info', summary: 'Eliminar Enlace', detail: 'En curso', life: 3000 });
    this.visible=false
    this.servicioEnlace.deleteEnlace(this.id!).subscribe({
      next:(data:any)=>{

        this.visible=false
              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Eliminar Enlace', detail: 'Completado', life: 3000 });
              
                setTimeout(() => {
                
                  for(let i=0;i<this.seccion.enlaces!.length;i++){
                    if(this.seccion.enlaces![i].id==this.editarEnlace.id){
                      this.seccion.enlaces!.splice(i,1)
                    }
                  }
    
              }, 1000);
               
            }, 1000); 
      
      },
        error: (err) => {

          this.messageService.add({ severity:'error', summary: 'Eliminar Noticia', detail: 'Cancelado', life: 3000 });
        }
    })
  }
  validarCampos():Boolean{

    let valido = true
    if(this.editarEnlace.textoClave==undefined){
      this.messageService.add({ severity: 'warn', summary: 'Actualizar Enlace', detail: 'El campo palabras claves es obligatorio', life: 3000 });
      valido=false
    }else{
      if(this.editarEnlace.textoClave.split(' ').join('').length<5){
        this.estiloValidacionTexto='ng-invalid ng-dirty'
        valido=false
        this.messageService.add({ severity: 'warn', summary: 'Actualizar Enlace', detail: 'Tamaño de palabras claves incorrecto', life: 3000 });
      }else{
        this.estiloValidacionTexto=''
      }
    }
    
    if(this.editarEnlace.url==undefined){
      this.estiloValidacionUrl='ng-invalid ng-dirty'
      valido=false
      this.messageService.add({ severity: 'warn', summary: 'Actualizar Enlace', detail: 'Dirección URL no introducida ', life: 3000 });
    }else{
      if(!this.httpRegex.test(this.editarEnlace.url)){
        this.estiloValidacionUrl='ng-invalid ng-dirty'
        valido=false
        this.messageService.add({ severity: 'warn', summary: 'Actualizar Enlace', detail: 'Dirección URL inválida ', life: 3000 });
      }else{
        this.estiloValidacionUrl=''
      }
    }
   

    return valido
  }

}
