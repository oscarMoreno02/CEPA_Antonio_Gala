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
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { Users } from '../../interface/users';

@Component({
  selector: 'app-editar-usuarios',
  standalone: true,
  imports: [    
    FormsModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputSwitchModule,
    ConfirmComponent,
    DropdownModule],
  templateUrl: './editar-usuarios.component.html',
  styleUrl: './editar-usuarios.component.css',
  providers: [DialogService, MessageService, UsersService]
})
export class EditarUsuariosComponent implements OnInit{
  constructor(
    public messageService: MessageService,
    private servicioUsers: UsersService
    ) {}
 value=''
  usuarios:Users={id:0,nombre:'',email:'',password:''}
 @Input() id?:number
 subscripcionUsuarios: Subscription=new Subscription;

@Input() listaUsuarios:Array<Users>=[]

 nuevaUsuarios:Users={id:0,nombre:'',email:'',password:''}

 estiloValidacionNombre=''
 estiloValidacionCorreo=''
 estiloValidacionContrasena=''

 //esto tengo que retocarlo
 ngOnInit(): void { 
   this.servicioUsers.usuarioGet(this.id!).subscribe({
     next: (usu:Users) => {
       this.usuarios=usu
       if(this.usuarios.email!=null){
         for(const c of this.listaUsuarios){
           if(c.id==this.usuarios.email){
             this.usuarios.email=c
           }
         }
         }
     },
     error: (err) => {
       console.log(err)
     }
     
   })
 }
 showDialog() {
   this.servicioUsers.getCategoria(this.id!).subscribe({
     next: (usu:Users) => {
       this.usuarios=usu
       if(this.usuarios.email!=null){
         this.subcategoria=true
         for(const c of this.listaUsuarios){
           if(c.id==this.usuarios.email){
             this.categoriaCorreo=c
           }
         }
       }else{
           this.subcategoria=false
         }
         let listaFiltrada:Array<Users>=[]
         for(const c of this.listaUsuarios){
           if(this.usuarios.id!=c.id){
             listaFiltrada.push(c)
           }
         }
         this.listaUsuarios=listaFiltrada

         this.visible = true;
     },
     error: (err) => {
       console.log(err)
     }
     
   })
 }

 guardar(b:Boolean){
   console.log(this.categoriaCorreo)
   if(b){

     if(this.validarCampos()){
       
     this.messageService.add({ severity: 'info', summary: 'Editar Users', detail: 'En curso', life: 3000 });
     this.servicioUsers.updateCategoria(this.usuarios).subscribe({
       next: (u:any) => {
         console.log(u)
             setTimeout(() => {
               this.messageService.add({ severity: 'success', summary: 'Editar Users', detail: 'Completada', life: 3000 });
               setTimeout(() => {
                 // window.location.reload()
             }, 1000); 
           }, 1000); 
         
       },
       error: (err) => {
         console.log(err)
         this.messageService.add({ severity:'error', summary: 'Editar Users', detail: 'Cancelada', life: 3000 });
       }
     })
   }
 }
 }
 eliminar(b:Boolean){
   console.log(this.categoriaCorreo)
   if(b){

     this.messageService.add({ severity: 'info', summary: 'Borrar Users', detail: 'En curso', life: 3000 });
     let i=this.usuarios.id as number
     this.servicioUsers.deleteCategoria(i).subscribe({
       next: (u:any) => {
         console.log(u)
             setTimeout(() => {
               this.messageService.add({ severity: 'success', summary: 'Borrar Users', detail: 'Completada', life: 3000 });
               setTimeout(() => {
                 window.location.reload()
             }, 1000); 
           }, 2000); 
         
       },
       error: (err) => {
         console.log(err)
         this.messageService.add({ severity:'error', summary: 'Borrar Users', detail: 'Cancelada', life: 3000 });
       }
     })
   
 }
 }
 validarCampos():Boolean{
   let valido = true
   if(this.usuarios.nombre.trim().length<5){
     
     this.estiloValidacionNombre='ng-invalid ng-dirty'
     valido=false
     this.messageService.add({ severity: 'warn', summary: 'Crear Users', detail: 'Tamaño de nombre incorrecto', life: 3000 });
   }else{
     this.estiloValidacionNombre=''
     if(!this.checkUnico(this.usuarios.nombre)){
       valido=false
       this.messageService.add({ severity: 'warn', summary: 'Crear Users', detail: 'Ya existe una usuarios con ese nombre', life: 3000 });
     }else{
       this.estiloValidacionNombre=''
     }
   }
   if(this.subcategoria){
     if(this.categoriaCorreo==undefined){
       this.estiloValidacionCorreo='ng-invalid ng-dirty'
       valido=false
     this.messageService.add({ severity: 'warn', summary: 'Crear Users', detail: 'No se ha seleccionado una usuarios principal', life: 3000 });
   }else{
     this.estiloValidacionCorreo=''
     this.usuarios.email=this.categoriaCorreo.id
   }
 }else{
   this.estiloValidacionCorreo=''
 }

   return valido
 }

 checkUnico(nombre:string):Boolean{
   let valido=true
   for(const usuarios of this.listaUsuarios){
     if(nombre.trim().toLowerCase() == usuarios.nombre.trim().toLowerCase()){
       if(usuarios.id!=this.usuarios.id){
         valido=false
       }
     }
   }
   return valido
 }
}
