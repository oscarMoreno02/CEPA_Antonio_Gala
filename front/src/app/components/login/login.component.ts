import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
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
error:string | null=null
  @Output() cerrarModal = new EventEmitter<void>();

cerrar(): void {
  this.cerrarModal.emit();
}
  showDialog() {
    this.visible = true;
  }
login(){
this.servicioAuth.login(this.email,this.password).subscribe({
  next:(data:any)=>{
    sessionStorage.setItem('token',data.token)
    this.visible=false
  },
  error:(err)=>{
    this.error=err.error.msg
    console.log(err)
  }
})
}
}
