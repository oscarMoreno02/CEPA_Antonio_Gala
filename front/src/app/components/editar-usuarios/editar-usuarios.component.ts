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
export class EditarUsuariosComponent implements OnInit {
  constructor(
    public messageService: MessageService,
    private servicioUsers: UsersService
  ) { }
  value = ''
  usuarios: Users = { id: 0, nombre: '', email: '', password: '' }
  @Input() id?: number
  subscripcionUsuarios: Subscription = new Subscription;

  @Input() listaUsuarios: Array<Users> = []

  nuevaUsuarios: Users = {
    id: 0,
    nombre: '',
    email: '',
    password: ''
  }

  estiloValidacionNombre = ''
  estiloValidacionCorreo = ''
  estiloValidacionContrasena = ''

  //esto tengo que retocarlo

  validaciones():Boolean{

    let validado = true
    let nombreRegex = /^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+([\s-][A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    let passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/

    //validar nombre
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

    //validar email
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

    //validar password
    if (this.usuarios.password){

      var passwordPrueba = passwordRegex.test(this.usuarios.password)
      
      if (passwordPrueba){
        this.estiloValidacionContrasena
      }else{
        this.estiloValidacionContrasena = 'ng-invalid ng-dirty'
        validado = false
        this.messageService.add({severity: 'warn', summary:'Editar usuario', detail:'La contraseña tiene que ser mayor a 8 caracteres', life:3000})

      }
    }else{

      this.estiloValidacionContrasena = 'ng-invalid ng-dirty'
      validado = false
      this.messageService.add({severity: 'warn', summary:'Editar usuario', detail:'El contraseña es obligatorio', life:3000})

    }
    return validado
  }

  ngOnInit(): void {

  }
}