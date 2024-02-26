

import { Component, Input, OnInit, input } from '@angular/core';
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
  selector: 'app-editar-categoria',
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
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css',
  providers: [DialogService, MessageService, CategoriasService]
})

export class EditarCategoriaComponent implements OnInit  {
  constructor(
     public messageService: MessageService,
     private servicioCategoria: CategoriasService
     ) {}

  @Input() visible: boolean = false;
  @Input() tipo=0
  value=''
   categoria:Categoria={id:0,nombre:'',dependiente:null}
  @Input() id?:number
  subscripcionCategorias: Subscription=new Subscription;

 @Input() listaCategorias:Array<Categoria>=[]

  categoriaDependiente?:Categoria
  
  subcategoria=false

  nuevaCategoria:Categoria={id:null,nombre:'',dependiente:null,}

  estiloValidacionNombre=''
  estiloValidacionDependiente=''

  ngOnInit(): void {
    this.servicioCategoria.getCategoria(this.id!).subscribe({
      next: (cat:Categoria) => {
        this.categoria=cat
        if(this.categoria.dependiente!=null){
          this.subcategoria=true
          for(const c of this.listaCategorias){
            if(c.id==this.categoria.dependiente){
              this.categoriaDependiente=c
            }
          }
          }
      },
      error: (err) => {

      }
      
    })
  }
  showDialog() {
    this.servicioCategoria.getCategoria(this.id!).subscribe({
      next: (cat:Categoria) => {
        this.categoria=cat
        if(this.categoria.dependiente!=null){
          this.subcategoria=true
          for(const c of this.listaCategorias){
            if(c.id==this.categoria.dependiente){
              this.categoriaDependiente=c
            }
          }
        }else{
            this.subcategoria=false
          }
          let listaFiltrada:Array<Categoria>=[]
          for(const c of this.listaCategorias){
            if(this.categoria.id!=c.id){
              listaFiltrada.push(c)
            }
          }
          this.listaCategorias=listaFiltrada

          this.visible = true;
      },
      error: (err) => {
  
      }
      
    })
  }
 
  guardar(b:Boolean){

    if(b){

      if(this.validarCampos()){
        
      this.messageService.add({ severity: 'info', summary: 'Editar Categoria', detail: 'En curso', life: 3000 });
      this.servicioCategoria.updateCategoria(this.categoria).subscribe({
        next: (u:any) => {

              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Editar Categoria', detail: 'Completada', life: 3000 });
                setTimeout(() => {
                  window.location.reload()
              }, 1000); 
            }, 1000); 
          
        },
        error: (err) => {
   
          this.messageService.add({ severity:'error', summary: 'Editar Categoria', detail: 'Cancelada', life: 3000 });
        }
      })
    }
  }
  }
  eliminar(b:Boolean){

    if(b){

      this.messageService.add({ severity: 'info', summary: 'Borrar Categoria', detail: 'En curso', life: 3000 });
      let i=this.categoria.id as number
      this.servicioCategoria.deleteCategoria(i).subscribe({
        next: (u:any) => {

              setTimeout(() => {
                this.messageService.add({ severity: 'success', summary: 'Borrar Categoria', detail: 'Completada', life: 3000 });
                setTimeout(() => {
                  window.location.reload()
              }, 1000); 
            }, 2000); 
          
        },
        error: (err) => {

          this.messageService.add({ severity:'error', summary: 'Borrar Categoria', detail: 'Cancelada', life: 3000 });
        }
      })
    
  }
  }
  validarCampos():Boolean{
    let valido = true
    if(this.categoria.nombre.split(' ').join('').length<5){
      this.estiloValidacionNombre='ng-invalid ng-dirty'
      valido=false
      this.messageService.add({ severity: 'warn', summary: 'Crear Categoria', detail: 'Tamaño de nombre incorrecto', life: 3000 });
    }else{
      this.estiloValidacionNombre=''
      if(!this.checkUnico(this.categoria.nombre)){
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
      this.categoria.dependiente=this.categoriaDependiente.id
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
  
        if(categoria.id!=this.categoria.id){
          
          valido=false
        }
      }
    }
    return valido
  }
}
