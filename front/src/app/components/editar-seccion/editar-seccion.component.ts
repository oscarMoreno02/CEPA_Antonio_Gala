import { Component, Input, KeyValueDiffers } from '@angular/core';
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
import { Subscription, lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { FotosSeccionesService } from '../../services/fotos-secciones.service';
import { environment } from '../../../environments/environment.development';

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
    private router:Router,
    private servicioFoto:FotosSeccionesService
    ) {}

 @Input() visible: boolean = false;
 @Input() tipo?:number
 @Input() noticia?:Noticia
 @Input() id :number=0
 subscripcionSeccion: Subscription=new Subscription;
 seccionEditar:Seccion={id:0,titulo:'',idNoticia:0}

 estiloValidacionTitulo=''
 estiloValidacionTexto=''


  formularioFoto: FormData | null = null
  fotoPreview: string | null = null

 ngOnInit(): void {
    this.subscripcionSeccion=this.servicioSeccion.getSeccion(this.id).subscribe({
      next:(data:Seccion)=>{
        this.seccionEditar=data
        if (this.seccionEditar.foto != null) {
          this.fotoPreview = environment.baseUrl + environment.urlFotosSecciones + '/' + this.seccionEditar.foto
        }
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
      if (this.seccionEditar.foto != null) {
        this.fotoPreview = environment.baseUrl + environment.urlFotosSecciones + '/' + this.seccionEditar.foto
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
     this.visible = true;
 }
 async guardar(b:Boolean){
   if(b){
     if(this.validarCampos()){
      await this.evaluarFoto()
      .then(data=>{
        this.seccionEditar.foto=data
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
      })
      .catch(err=>{
        this.seccionEditar.foto=null
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
  async evaluarFoto(): Promise<null | string | undefined> {
    let id: string | null = this.seccionEditar.foto!;
    if (this.formularioFoto == null) {
      if(this.fotoPreview==null){
        if (this.seccionEditar.foto != null) {
          try {
            const data: any = await lastValueFrom(this.servicioFoto.deleteFoto(this.seccionEditar.foto));
            id = null;
          } catch (err) {
            id=null
            return id;
          }
        }
      }else{
        return id;
      }
    } else {
        try {
            const data: any = await lastValueFrom(this.servicioFoto.updateFoto(this.seccionEditar.foto!, this.formularioFoto));
            id = data.url;
        } catch (err) {
            return id;
        }
    }
    return id;
}
}
