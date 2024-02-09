import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmComponent } from '../confirm/confirm.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { SeccionService } from '../../services/seccion.service';
import { NoticiaService } from '../../services/noticia.service';

import { Noticia, Seccion } from '../../interface/noticia';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-seccion',
  standalone: true,
  imports: [    
    FormsModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputSwitchModule,
    ConfirmComponent,
    InputTextareaModule,],
    providers:[MessageService, SeccionService],
  templateUrl: './editar-seccion.component.html',
  styleUrl: './editar-seccion.component.css'
})
export class EditarSeccionComponent {
  constructor(
    public messageService: MessageService,
    private servicioSeccion: SeccionService ,
    private servicioNoticia: NoticiaService,
    private router:Router
    ) {}

 @Input() visible: boolean = false;
 @Input() tipo?:number
 @Input() noticia?:Noticia
 @Input() id :number=0
 subscripcionSeccion: Subscription=new Subscription;
 seccionEditar:Seccion={id:0,titulo:'',idNoticia:0}

 estiloValidacionTitulo=''
 estiloValidacionTexto=''
  urlFoto=''

 ngOnInit(): void {
    this.subscripcionSeccion=this.servicioSeccion.getSeccion(this.id).subscribe({
      next:(data:Seccion)=>{
        this.seccionEditar=data
      },
      error:(err)=>{
        console.log(err)
      }
    })
 }  
 showDialog() {
  this.subscripcionSeccion=this.servicioSeccion.getSeccion(this.id).subscribe({
    next:(data:Seccion)=>{
      this.seccionEditar=data
    },
    error:(err)=>{
      console.log(err)
    }
  })
     this.visible = true;
 }
 guardar(b:Boolean){
   if(b){
     if(this.validarCampos()){
      this.seccionEditar.foto=this.urlFoto
     this.messageService.add({ severity: 'info', summary: 'Actualizar sección', detail: 'En curso', life: 3000 });
     this.servicioSeccion.updateSeccion(this.seccionEditar).subscribe({
       next: (data:any) => {
             setTimeout(() => {
               this.messageService.add({ severity: 'success', summary: 'Actualizar sección', detail: 'Completada', life: 3000 });
      
              for(let i=0 ;i< this.noticia!.secciones!.length;i++){
                if (this.noticia!.secciones![i].id==this.seccionEditar.id){
                  this.noticia!.secciones![i]=this.seccionEditar
                  this.visible=false
                }
              }
           }, 1000); 
       },
       error: (err) => {
         console.log(err)
         this.messageService.add({ severity:'error', summary: 'Actualizar seccion', detail: 'Cancelada', life: 3000 });
       }
     })
   }
 }
 }

 validarCampos():Boolean{
   let valido = true
   if(this.seccionEditar.titulo){
    if(this.seccionEditar.titulo.split(' ').join('').length<5){

      this.estiloValidacionTitulo='ng-invalid ng-dirty'
      valido=false
      this.messageService.add({ severity: 'warn', summary: 'Actualizar Sección', detail: 'Tamaño de título incorrecto', life: 3000 });
    }else{
      this.estiloValidacionTitulo=''
    }
   }else{
     this.estiloValidacionTitulo='ng-invalid ng-dirty'
     this.messageService.add({ severity: 'warn', summary: 'Actualizar Sección', detail: 'El título de la seccion es obligatorio', life: 3000 });
    valido=false
   }
   if(this.seccionEditar.texto){
    if(this.seccionEditar.texto.split(' ').join('').length<5){
      this.estiloValidacionTexto='ng-invalid ng-dirty'
      valido=false
      this.messageService.add({ severity: 'warn', summary: 'Actualizar Sección', detail: 'Tamaño de texto incorrecto', life: 3000 });
    }else{
      this.estiloValidacionTexto=''
    }
   }else{
     this.estiloValidacionTexto='ng-invalid ng-dirty'
     this.messageService.add({ severity: 'warn', summary: 'Actualizar Sección', detail: 'El texto de la sección es obligatorio', life: 3000 });
    valido=false
   }
  
   return valido
 }

}
