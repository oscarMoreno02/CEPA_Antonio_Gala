//Raul
import { Component, EventEmitter ,Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService} from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ModificarRolesComponent } from '../modificar-roles/modificar-roles.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmComponent } from '../confirm/confirm.component';
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
    ModificarRolesComponent
  ],
  templateUrl: './editar-usuarios.component.html',
  styleUrl: './editar-usuarios.component.css',
  providers: [DialogService, MessageService, UsersService]
})
export class EditarUsuariosComponent implements OnInit {
  constructor(
    public messageService: MessageService,
    private servicioUsers: UsersService
  ) { }
  value = ''
  us!:Users
  usuarios: Users = { 
    id: 0, 
    nombre: '', 
    email: '', 
    password: '' 
  }
  @Input() usuario?: any
  @Input() id!: number
  subscripcionUsuarios: Subscription = new Subscription;

  @Input() visible: boolean = false

  @Output() cerrarModal = new EventEmitter<void>();

  @Input() tipo=0

  estiloValidacionNombre = ''
  estiloValidacionCorreo = ''
  estiloValidacionContrasena = ''

  validaciones():Boolean{

    let validado = true
    let nombreRegex = /^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+([\s-][A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (this.usuarios.nombre){

      var nombrePrueba = nombreRegex.test(this.usuarios.nombre)
      
      if (nombrePrueba){
        this.estiloValidacionNombre
      }else{
        this.estiloValidacionNombre = 'ng-invalid ng-dirty'
        validado = false
        this.messageService.add({severity: 'warn', summary:'Editar usuario', detail:'El nombre no puede contener caracteres especiales', life:3000})

      }
    }else{

      this.estiloValidacionNombre = 'ng-invalid ng-dirty'
      validado = false
      this.messageService.add({severity: 'warn', summary:'Editar usuario', detail:'El nombre es obligatorio', life:3000})

    }

    if (this.usuarios.email){

      var emailPrueba = emailRegex.test(this.usuarios.email)
      
      if (emailPrueba){
        this.estiloValidacionCorreo
      }else{
        this.estiloValidacionCorreo = 'ng-invalid ng-dirty'
        validado = false
        this.messageService.add({severity: 'warn', summary:'Editar usuario', detail:'El correo tiene que tener el @', life:3000})

      }
    }else{

      this.estiloValidacionCorreo = 'ng-invalid ng-dirty'
      validado = false
      this.messageService.add({severity: 'warn', summary:'Editar usuario', detail:'El correo es obligatorio', life:3000})

    }
    return validado
  }

  ngOnInit(): void {

  }

  cerrar(): void {
    this.cerrarModal.emit();
  }

  async guardar(b:Boolean){
    if(b){
      if(this.validaciones()){
         this.servicioUsers.usuariosPut(this.usuarios,this.id).subscribe({
          next: (data:any)=> {
            setTimeout(()=>{
              this.messageService.add({severity:'success', summary:'Actualizar usuario', detail:'Completada', life:3000})
          
              for(let i=0;i<this.usuario.length;i++){
                if(this.usuario[i].id == this.usuarios.id){
              
                  this.usuario[i]=this.usuarios
                  this.visible=false
                }
                this.visible=false
              }
              window.location.reload()
            }, 1000)
          },
          error: (err) => {
      
            this.messageService.add({ severity:'error', summary: 'Actualizar usuario', detail: 'Error al actualizar el usuario, inténtelo de nuevo', life: 3000 });
          }
        })
      }
    }
  }

  showDialog(){
    this.servicioUsers.usuarioGet(this.id!).subscribe({
      
      next: (usu:Users) => {
        this.us = usu
        this.visible=true
        this.usuarios.nombre = usu.nombre
        this.usuarios.email = usu.email
        this.usuarios.password = usu.password
      
      },
      error: (e) => {
      
      }
    })
  }

  async eliminar(b:Boolean){
    this.servicioUsers.usuariosDelete(this.id).subscribe({
     next:(data: any) => {
       setTimeout(()=>{
         this.messageService.add({severity:'success', summary:'Eliminar usuario', detail:'Completada', life:3000})
         for(let i=0;i<this.usuario.length;i++){
           if(this.usuario[i].id == this.usuarios.id){
           this.usuario[i]=this.us
           this.visible=false
           window.location.reload()
         }
         this.visible=false
       }
       window.location.reload()
     }, 1000)
   },
   error: (err) => {
  
     this.messageService.add({ severity:'error', summary: 'Eliminar usuario', detail: 'Error al eliminar el usuario, inténtelo de nuevo', life: 3000 });
   }
   })
 }
}