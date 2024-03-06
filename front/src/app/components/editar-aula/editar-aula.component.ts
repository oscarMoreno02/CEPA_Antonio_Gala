import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';

import { AulaService } from '../../services/aula.service';
import { Router } from '@angular/router';
import { Aula } from '../../interface/aula';
//Óscar
@Component({
  selector: 'app-editar-aula',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ConfirmComponent,
  ],
  providers: [DialogService, MessageService, AulaService],
  templateUrl: './editar-aula.component.html',
  styleUrl: './editar-aula.component.css'
})
export class EditarAulaComponent implements OnInit {
  constructor(
    public messageService: MessageService,
    private servicioAulas: AulaService,
    private router: Router,

  ) { }
  editarAula: Aula = { nombre: '' }
  aulaSubscripcion: Subscription = new Subscription
  estiloValidacionTexto = ''
  @Input() visible: boolean = false;
  @Input() tipo = 0
  @Input() id: number = 0
  @Input() listaAulas: Array<Aula> = []
  showDialog() {
    this.visible = true;
  }
  ngOnInit(): void {
    this.aulaSubscripcion = this.servicioAulas.getAula(this.id).subscribe({
      next: (data) => {
        this.editarAula = data
      },
      error: (err) => {
     
      }
    })
  }
  crear(b: Boolean) {
    if (b) {

      if (this.validarCampos()) {
        this.messageService.add({ severity: 'info', summary: 'Editar Aula', detail: 'En curso', life: 3000 });
        this.servicioAulas.updateAula(this.editarAula).subscribe({
          next: (data: any) => {
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Editar Aula', detail: 'Completada', life: 3000 });
              setTimeout(() => {
                for (let i=0;i<this.listaAulas.length;i++){
                  if(this.listaAulas[i].id==this.editarAula.id){
                    this.listaAulas[i]=this.editarAula
                  }
                }
              }, 1000);
            }, 1000);

          },
          error: (err) => {

            this.messageService.add({ severity: 'error', summary: 'Editar Aula', detail: 'Cancelada', life: 3000 });
          }
        })
      }
    }
  }
  validarCampos(): Boolean {

    let valido = true

    if (this.editarAula.nombre.split(' ').join('').length < 4) {
      this.estiloValidacionTexto = 'ng-invalid ng-dirty'
      valido = false
      this.messageService.add({ severity: 'warn', summary: 'Editar Aula', detail: 'Tamaño de nombre incorrecto', life: 3000 });
    } else {
      this.estiloValidacionTexto = ''
    }
    if(valido==true){
      for(let i=0;i<this.listaAulas.length;i++){

        if(this.listaAulas[i].nombre.toLowerCase().split(' ').join('')==(this.editarAula.nombre.toLowerCase().split(' ').join(''))){
          valido=false
          this.messageService.add({ severity: 'warn', summary: 'Editar Aula', detail: 'Nombre ya registrado', life: 3000 });
        }
      }
    }

    return valido
  }
  eliminar(b: Boolean) {

    if (b) {

      this.messageService.add({ severity: 'info', summary: 'Borrar Aula', detail: 'En curso', life: 3000 });
      this.servicioAulas.deleteAula(this.editarAula.id!).subscribe({
        next: (u: any) => {

          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Borrar Aula', detail: 'Completada', life: 3000 });
            setTimeout(() => {
              window.location.reload()
            }, 1000);
          }, 2000);

        },
        error: (err) => {

          this.messageService.add({ severity: 'error', summary: 'Borrar Aula', detail: 'Cancelada', life: 3000 });
        }
      })

    }
  }
}
