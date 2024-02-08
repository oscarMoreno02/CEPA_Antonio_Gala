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
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../interface/noticia';
@Component({
  selector: 'app-edit-noticia-data',
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
    EditNoticiaDataComponent
  ],
  providers:[CategoriasService,NoticiaService,DialogService, MessageService,],
  templateUrl: './edit-noticia-data.component.html',
  styleUrl: './edit-noticia-data.component.css'
})
export class EditNoticiaDataComponent implements OnInit {
  constructor(
    public messageService: MessageService,
    private servicioCategoria: CategoriasService,
    private servicioNoticia:NoticiaService
    ) {}


  @Input() visible: boolean = false;
  @Input() tipo=0
  value=''
   categoria:Categoria={id:0,nombre:'',dependiente:null}
  @Input() id?:number
  subscripcionCategorias: Subscription=new Subscription;

 @Input() listaCategorias:Array<Categoria>=[]
  httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/ ;
  categoriaDependiente?:Categoria

  noticiaEditar:Noticia={id:null,titulo:'',idCategoria:null,}
  estiloValidacionNombre=''
  estiloValidacionDependiente=''
  estiloValidacionUrl=''
  
    enlace?:boolean
    url=''

  ngOnInit(): void {
    this.enlace=false
    this.servicioNoticia.getNoticia(this.id!).subscribe({
      next: (n:Noticia) => {
        this.noticiaEditar=n
          for(const categoria of this.listaCategorias){
            if(categoria.id==this.noticiaEditar.idCategoria){
              this.categoriaDependiente=categoria
            }
          }
          if(this.noticiaEditar.enlace!=undefined){
            this.enlace=true
            this.url=this.noticiaEditar.enlace
          }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  showDialog() {
    this.enlace=false
    this.servicioNoticia.getNoticia(this.id!).subscribe({
      next: (n:Noticia) => {
        this.noticiaEditar=n
          for(const categoria of this.listaCategorias){
            if(categoria.id==this.noticiaEditar.idCategoria){
              this.categoriaDependiente=categoria
            }
          }
          if(this.noticiaEditar.enlace!=undefined){
            this.enlace=true
            this.url=this.noticiaEditar.enlace
          }
      },
      error: (err) => {
        console.log(err)
      }
    })
    this.visible=true
  }
  guardar(b:Boolean){
    console.log(this.categoriaDependiente)
    if(b){
      if(this.validarCampos()){
      this.messageService.add({ severity: 'info', summary: 'Editar Noticia', detail: 'En curso', life: 3000 });
      this.servicioNoticia.updateNoticia(this.noticiaEditar).subscribe({
        next: (u:any) => {
          console.log(u)
              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Editar Noticia', detail: 'Completada', life: 3000 });
                setTimeout(() => {
                  window.location.reload()
              }, 1000); 
            }, 1000); 
          
        },
        error: (err) => {
          console.log(err)
          this.messageService.add({ severity:'error', summary: 'Editar Noticia', detail: 'Cancelada', life: 3000 });
        }
      })
    }
  }
  }
  eliminar(b:Boolean){

    if(b){

      this.messageService.add({ severity: 'info', summary: 'Borrar Noticia', detail: 'En curso', life: 3000 });
      let id=this.noticiaEditar.id as number
      this.servicioNoticia.deleteNoticia(id).subscribe({
        next: (u:any) => {
          console.log(u)
              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Borrar Noticia', detail: 'Completada', life: 3000 });
                setTimeout(() => {
                  // window.location.reload()
              }, 1000); 
            }, 1000); 
          
        },
        error: (err) => {
          console.log(err)
          this.messageService.add({ severity:'error', summary: 'Borrar Noticia', detail: 'Cancelada', life: 3000 });
        }
      })
    
  }
  }
  validarCampos():Boolean{
    this.noticiaEditar.enlace=null
    let valido = true
    if(this.noticiaEditar.titulo.split(' ').join('').length<5){
      this.estiloValidacionNombre='ng-invalid ng-dirty'
      valido=false
      this.messageService.add({ severity: 'warn', summary: 'Crear Noticia', detail: 'Tamaño de titulo incorrecto', life: 3000 });
    }else{
      this.estiloValidacionNombre=''
    }
    
    if(this.categoriaDependiente==undefined){
      this.estiloValidacionDependiente='ng-invalid ng-dirty'
      valido=false
      this.messageService.add({ severity: 'warn', summary: 'Crear Noticia', detail: 'No se ha seleccionado una categoria', life: 3000 });
     
    }else{
    this.noticiaEditar.idCategoria=this.categoriaDependiente.id
    this.estiloValidacionDependiente=''
    }
    if(this.enlace){
      if(this.url!=undefined){
        if(!this.httpRegex.test(this.url)){
          this.estiloValidacionUrl='ng-invalid ng-dirty'
          valido=false
          this.messageService.add({ severity: 'warn', summary: 'Crear Noticia', detail: 'Dirección URL inválida ', life: 3000 });
        }else{
          this.noticiaEditar.enlace=this.url
          this.estiloValidacionUrl=''
        }
      }else{
          valido=false
          this.estiloValidacionUrl='ng-invalid ng-dirty'
          this.messageService.add({ severity: 'warn', summary: 'Crear Noticia', detail: 'Direccion URL no introducida ', life: 3000 });
      }
    }else{
      this.estiloValidacionUrl=''
      this.noticiaEditar.enlace=null
    }

    return valido
  }
  }

