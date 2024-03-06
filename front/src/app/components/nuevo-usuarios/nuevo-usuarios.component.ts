//Raul

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmComponent } from '../confirm/confirm.component';
import { DropdownModule } from 'primeng/dropdown';;
import { UsersService } from '../../services/users.service';
import { Users } from '../../interface/users';
import {MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { DialogService } from 'primeng/dynamicdialog';



@Component({
  selector: 'app-nuevo-usuarios',
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
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatCardModule, 
  ],
  templateUrl: './nuevo-usuarios.component.html',
  styleUrl: './nuevo-usuarios.component.css',
  providers:[
    DialogService, 
    MessageService, 
    UsersService
  ]
})
export class NuevoUsuariosComponent {
  constructor(  
    public messageService:MessageService,
    private usuariosService:UsersService
    ) {}
    ngOnInit(): void{

    }

    @Input() visible: boolean = false;
    @Output() cerrarModal = new EventEmitter<void>();
    value = ''
    estiloValidacionNombre = ''
    estiloValidacionCorreo = ''
    estiloValidacionPassword = '' 

    nuevoUsuario : Users = {
      id: 0,
      nombre: '',
      email: '',
      password: ''
    }

    validaciones():Boolean{

      let validado = true
      let nombreRegex = /^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+([\s-][A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/
      let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  
      //validar nombre
      if (this.nuevoUsuario.nombre){
  
        var nombrePrueba = nombreRegex.test(this.nuevoUsuario.nombre)
        
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
      if (this.nuevoUsuario.email){
  
        var emailPrueba = emailRegex.test(this.nuevoUsuario.email)
        
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

    showDialog() {
      this.visible = true;
    }

    cerrar(): void {
      this.cerrarModal.emit();
    }

    crear(b:Boolean){
      if (b){
        if(this.validaciones()){
          this.messageService.add({ severity: 'info', summary:'Crear usuario', detail:'En curso', life:3000});
    
          this.usuariosService.usuariosPost(this.nuevoUsuario).subscribe({
            next: (data: any) => {
         
              setTimeout(() => {
                this.messageService.add({severity: 'success', summary:'Crear usuario', detail:'Completado', life:3000});
                this.nuevoUsuario.id = data.id
                this.nuevoUsuario.nombre= ''
                this.nuevoUsuario.email= ''
                this.nuevoUsuario.password= ''
                window.location.reload() 
              });
            },
            error: (error) => {
              this.messageService.add({severity: 'error', summary:'Crear usuario', detail:'Ha surguido un error al crear el usuario, inténtelo de nuevo', life:3000});
            }
          });
        }
      }
    }
}
 