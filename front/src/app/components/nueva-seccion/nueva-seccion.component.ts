
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmComponent } from '../confirm/confirm.component';
import { DropdownModule } from 'primeng/dropdown';
import { CategoriasService } from '../../services/categorias.service';
import { Subscription } from 'rxjs';
import { Categoria } from '../../interface/categoria';
import { Enlace, Noticia, Seccion } from '../../interface/noticia';
import { NoticiaService } from '../../services/noticia.service';
import { Router } from '@angular/router';
import { SeccionService } from '../../services/seccion.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
@Component({
  selector: 'app-nueva-seccion',
  standalone: true,
  imports: [    
    FormsModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputSwitchModule,
    ConfirmComponent,
    InputTextareaModule
  ],
  templateUrl: './nueva-seccion.component.html',
  styleUrl: './nueva-seccion.component.css',
  providers:[MessageService]
})
export class NuevaSeccionComponent {
  constructor(
    public messageService: MessageService,
    private servicioSeccion: SeccionService ,
    private servicioNoticia: NoticiaService,
    private router:Router
    ) {}

 @Input() visible: boolean = false;
 @Input() tipo?:number
 @Input() noticia?:Noticia
 subscripcionSeccion: Subscription=new Subscription;
 nuevaSeccion:Seccion={id:0,titulo:'',idNoticia:0}
 foto=null
 estiloValidacionTitulo=''
 estiloValidacionTexto=''
  urlFoto=''

 ngOnInit(): void {
 }
 showDialog() {
  this.visible = true;
 }
 crear(b:Boolean){
   if(b){
     if(this.validarCampos()){
     this.messageService.add({ severity: 'info', summary: 'Crear seccion', detail: 'En curso', life: 3000 });
     this.nuevaSeccion.idNoticia=this.noticia!.id
     this.servicioSeccion.insertSeccion(this.nuevaSeccion).subscribe({
       next: (data:any) => {
             setTimeout(() => {
               this.messageService.add({ severity: 'success', summary: 'Crear seccion', detail: 'Completada', life: 3000 });
               this.nuevaSeccion.id=data.id
              
              this.noticia?.secciones?.push({id: this.nuevaSeccion.id,idNoticia:this.noticia.id,titulo:this.nuevaSeccion.titulo,texto:this.nuevaSeccion.texto})
              this.nuevaSeccion.id=0
              this.nuevaSeccion.enlaces=[]
              this.nuevaSeccion.foto=''
              this.nuevaSeccion.texto=''
              this.nuevaSeccion.titulo=''
              this.visible=false
           }, 1000); 
         
       },
       error: (err) => {
         console.log(err)
         this.messageService.add({ severity:'error', summary: 'Crear seccion', detail: 'Cancelada', life: 3000 });
       }
     })
   }
 }
 }
 validarCampos():Boolean{
   let valido = true
   if(this.nuevaSeccion.titulo){
    if(this.nuevaSeccion.titulo.split(' ').join('').length<5){

      this.estiloValidacionTitulo='ng-invalid ng-dirty'
      valido=false
      this.messageService.add({ severity: 'warn', summary: 'Crear Seccion', detail: 'Tamaño de titulo incorrecto', life: 3000 });
    }else{
      this.estiloValidacionTitulo=''
    }
   }else{
     this.estiloValidacionTitulo='ng-invalid ng-dirty'
     this.messageService.add({ severity: 'warn', summary: 'Crear Seccion', detail: 'El titulo de la seccion es obligatorio', life: 3000 });
    valido=false
   }
   if(this.nuevaSeccion.texto){
    if(this.nuevaSeccion.texto.split(' ').join('').length<5){
      this.estiloValidacionTexto='ng-invalid ng-dirty'
      valido=false
      this.messageService.add({ severity: 'warn', summary: 'Crear Noticia', detail: 'Tamaño de texto incorrecto', life: 3000 });
    }else{
      this.estiloValidacionTexto=''
    }
   }else{
     this.estiloValidacionTexto='ng-invalid ng-dirty'
     this.messageService.add({ severity: 'warn', summary: 'Crear Noticia', detail: 'El texto de la seccion es obligatorio', life: 3000 });
    valido=false
   }
  
   return valido
 }


}
