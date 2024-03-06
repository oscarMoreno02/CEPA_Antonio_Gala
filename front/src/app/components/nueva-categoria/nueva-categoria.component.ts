

import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
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
//Óscar
@Component({
  selector: 'app-nueva-categoria',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputSwitchModule,
    ConfirmComponent,
    DropdownModule
  
  ],
  templateUrl: './nueva-categoria.component.html',
  styleUrl: './nueva-categoria.component.css',
  providers: [DialogService, MessageService, CategoriasService],
  encapsulation:ViewEncapsulation.None
})

export class NuevaCategoriaComponent implements OnInit  {
  constructor(
     public messageService: MessageService,
     private servicioCategoria: CategoriasService
     ) {}

  @Input() visible: boolean = false;
  @Input() tipo=0
  @Output() cerrarModal = new EventEmitter<void>();
  value=''

  subscripcionCategorias: Subscription=new Subscription;
  listaCategorias:Array<Categoria>=[]
  categoriaDependiente?:Categoria
  subcategoria=false

  nuevaCategoria:Categoria={id:null,nombre:'',dependiente:null,}

  estiloValidacionNombre=''
  estiloValidacionDependiente=''

  ngOnInit(): void {
    this.subscripcionCategorias = this.servicioCategoria.getAllCategorias().subscribe({
      next: (data: any) => {
        this.listaCategorias=data
      },
      error: (err) => {

      }
      
    });
  }
  showDialog() {
      this.visible = true;
  }

cerrar(): void {
  this.cerrarModal.emit();
}
  crear(b:Boolean){
    if(b){


      if(this.validarCampos()){
     
      this.messageService.add({ severity: 'info', summary: 'Crear Categoria', detail: 'En curso', life: 3000 });
      this.servicioCategoria.insertCategoria(this.nuevaCategoria).subscribe({
        next: (u:any) => {

              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Crear Categoria', detail: 'Completada', life: 3000 });
                setTimeout(() => {
                  window.location.reload()
              }, 1000); 
            }, 2000); 
          
        },
        error: (err) => {
     
          this.messageService.add({ severity:'error', summary: 'Crear Categoria', detail: 'Cancelada', life: 3000 });
        }
      })
    }
  }
  }
  validarCampos():Boolean{
    let valido = true
    if(this.nuevaCategoria.nombre.split(' ').join('').length<5){
      
      this.estiloValidacionNombre='ng-invalid ng-dirty'
      valido=false
      this.messageService.add({ severity: 'warn', summary: 'Crear Categoria', detail: 'Tamaño de nombre incorrecto', life: 3000 });
    }else{
      this.estiloValidacionNombre=''
      if(!this.checkUnico(this.nuevaCategoria.nombre)){
        valido=false
        this.messageService.add({ severity: 'warn', summary: 'Crear Categoria', detail: 'Ya existe una categoria con ese nombre', life: 3000 });
      }else{
        this.estiloValidacionNombre=''
      }
    }
    if(this.subcategoria){
      if(this.categoriaDependiente==undefined){
        this.estiloValidacionDependiente='ng-invalid ng-dirty'
        valido=false
      this.messageService.add({ severity: 'warn', summary: 'Crear Categoria', detail: 'No se ha seleccionado una categoria principal', life: 3000 });
    }else{
      this.estiloValidacionDependiente=''
      this.nuevaCategoria.dependiente=this.categoriaDependiente.id
    }
  }else{
    this.estiloValidacionDependiente=''
  }

    return valido
  }

  checkUnico(nombre:string):Boolean{
    let valido=true
    for(const categoria of this.listaCategorias){

      if(nombre.split(' ').join('').toLowerCase() == categoria.nombre.split(' ').join('').toLowerCase()){
        valido=false
      }

    }
    return valido
  }
}
