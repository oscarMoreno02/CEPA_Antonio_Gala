/**Laura María Pedraza Gómez */
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmComponent } from "../confirm/confirm.component";
import { Usuario } from '../../interface/usuario';
import { FormsModule, NgModel } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { AsistenciaService } from '../../services/asistencia.service';
import { DialogService } from 'primeng/dynamicdialog';
import { UsersComponent } from '../users/users.component';
import { Users } from '../../interface/users';
import { Asistencia } from '../../interface/asistencia';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from '../../services/eventos.service';

@Component({
    selector: 'app-nuevo-asistente-evento',
    standalone: true,
    templateUrl: './nuevo-asistente-evento.component.html',
    styleUrl: './nuevo-asistente-evento.component.css',
    providers: [MessageService, AsistenciaService, DialogService],
    imports: [
      ToastModule,
        DialogModule,
        ButtonModule, 
        ConfirmComponent,
        InputTextModule,
        FormsModule
      ]
})
export class NuevoAsistenteEventoComponent implements OnInit {

  usuarios!: Array<Users>

  constructor(
    private servicioAsistencia: AsistenciaService,
    public messageService:MessageService,
    private servicioUsers : UsersService,
    private route: ActivatedRoute,
    private servicioEvento : EventosService
  ){
    this.usuarios = []
  }
  
  subscriptionUsers: Subscription=new Subscription;
  eventoId!:any;

  ngOnInit(): void{
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.eventoId = +idParam
      this.asistencia.idEvento = this.eventoId
    }
    this.subscriptionUsers = this.servicioUsers.usuariosGet().subscribe({
      next: (data: Array<Users>) => {
        this.usuarios=data
      },
      error: (e) => {
      }
    })
  }

  validacionEmail = ''

  @Input() visible = false;
  @Output() cerrarModal = new EventEmitter<void>();

  showDialog() {
    this.visible = true;
  }

  cerrar(): void {
    this.cerrarModal.emit();
  }

  validarEmail(email:string){
    var regex = /\S+@\S+\.\S+/
    var regexTest = regex.test(email)
    return regexTest
  }

  guardar(confirm:Boolean){
    if (confirm){
      if (this.validarEmail(this.usuario.email)){
        if (this.usuarios && this.usuarios.length > 0) {
          for (var i=0 ; i<this.usuarios.length ; i++){
            if (this.usuarios[i].email == this.usuario.email){
              this.usuario.id = this.usuarios[i].id
              this.asistencia.idUsuario = this.usuario.id
            }
          }
          this.servicioEvento.deletePlaza(this.eventoId).subscribe({
            next: (data:any) => { 
              this.servicioAsistencia.insertAsistencia(this.asistencia).subscribe({
                next: (data: any) => {
                  window.location.reload()
                  setTimeout(() => {
                    this.messageService.add({severity: 'success', summary:'Crear Asistencia', detail:'Completado', life:3000});
                    this.asistencia.id = data.id
                    this.asistencia.idUsuario = 0
                    this.asistencia.idEvento = 0
                  });
                },
                error: (error) => {
                  this.messageService.add({severity: 'error', summary:'Crear Asistencia', detail:'El usuario introducido ya se encuentra apuntado al evento o no está registrado', life:3000});
                }
              });
            }
          })
        } else {
          this.validacionEmail = 'ng-invalid ng-dirty'
          this.messageService.add({severity:'warn', summary:'Crear Asistencia', detail:'No se encontraron usuarios', life:3000})
        }
      } else {
        this.validacionEmail = 'ng-invalid ng-dirty'
        this.messageService.add({severity:'warn', summary:'Crear Asistencia', detail:'El email debe de tener un formato correcto', life:3000})
      }
    }
  }

  asistencia : Asistencia = {
    id: 0,
    idUsuario : 0,
    idEvento : 0
  }

  usuario: Usuario = {
    id: 0,
    nombre: "",
    email: "",
    password: ""
  }
}
