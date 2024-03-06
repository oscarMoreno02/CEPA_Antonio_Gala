import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { CategoriasService } from '../../services/categorias.service';

import { AuthService } from '../../services/auth.service';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { MenubarModule } from 'primeng/menubar';
import { Usuario } from '../../interface/usuario';
//Óscar
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    MenubarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
 providers: [DialogService, MessageService, CategoriasService]
})
export class LoginComponent {
  constructor(
    public messageService: MessageService,
    private servicioCategoria: CategoriasService,
    private servicioAuth: AuthService,
    private router: Router,
  ){}
  @Input() tipo = 0
  @Input() visible: boolean = false;
email=''
password=''
register=false
error:string | null=null
 EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

nombre=''
password2=''

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() logged = new EventEmitter<boolean>();

cerrar(): void {
  this.register=false
  this.cerrarModal.emit();
}
  showDialog() {
    this.visible = true;
  }
login(){
this.servicioAuth.login(this.email,this.password).subscribe({
  next:(data:any)=>{
    this.logged.emit(true)
    sessionStorage.setItem('token',data.token)
    this.servicioAuth.loginOn()
    this.visible=false
  },
  error:(err)=>{
    this.logged.emit(false)
    this.error=err.error.msg

  }
})
}
registro(){
  let valido=this.validarRegistro()
  if(valido==true){
    const newUser:Usuario={nombre:this.nombre,email:this.email,password:this.password}
   
    this.servicioAuth.registro(newUser).subscribe({
      next:(data:any)=>{
        this.logged.emit(true)
        sessionStorage.setItem('token',data.token)
        this.servicioAuth.loginOn()
        this.visible=false
      },
      error:(err)=>{
        this.logged.emit(false)
        let msg=''
    
        for(const e of err.error.errors){
          msg=msg+e.msg+ '<br>'
          
        }
        this.error=msg
        
      }
    })
  }else{

    this.logged.emit(false)

    this.error=valido.toString()
  }
}
  changeType(b:boolean){
  this.register=b
  this.password=''
  this.password2=''
  this.nombre=''
  this.error=''
}
validarRegistro():boolean | string{
  if(!this.EMAIL_REGEX.test(this.email)){
    return 'Dirección de email no valida'
  }
  if(this.password!=this.password2){
    return 'Las contraseñas no coinciden'
  }
  if(this.password.split(' ').join('').length < 6){
    return 'Tamaño de la contraseña incorrecto'
  }
return true

}

}
