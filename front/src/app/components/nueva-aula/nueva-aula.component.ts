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
  selector: 'app-nueva-aula',
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
  templateUrl: './nueva-aula.component.html',
  styleUrl: './nueva-aula.component.css'
})
export class NuevaAulaComponent {
  constructor(
    public messageService: MessageService,
    private servicioAulas: AulaService,
    private router: Router,

  ) { }
  nuevaAula: Aula = { nombre: '' }
  aulaSubscripcion: Subscription = new Subscription
  estiloValidacionTexto = ''
  @Input() visible: boolean = false;
  @Input() tipo = 0
  @Input() listaAulas: Array<Aula> = []
  httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

  showDialog() {
    this.visible = true;
  }
  crear(b: Boolean) {
    if (b) {

      if (this.validarCampos()) {
        this.messageService.add({ severity: 'info', summary: 'Crear Aula', detail: 'En curso', life: 3000 });
        this.servicioAulas.insertAula(this.nuevaAula).subscribe({
          next: (data: any) => {
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Crear Aula', detail: 'Completada', life: 3000 });
              this.nuevaAula.id = data.id
              setTimeout(() => {
                window.location.reload()
        
              }, 1000);
            }, 1000);

          },
          error: (err) => {

            this.messageService.add({ severity: 'error', summary: 'Crear Aula', detail: 'Cancelada', life: 3000 });
          }
        })
      }
    }
  }
  validarCampos(): Boolean {

    let valido = true

    if (this.nuevaAula.nombre.split(' ').join('').length < 4) {
      this.estiloValidacionTexto = 'ng-invalid ng-dirty'
      valido = false
      this.messageService.add({ severity: 'warn', summary: 'Crear Aula', detail: 'Tamaño de nombre incorrecto', life: 3000 });
    } else {
      this.estiloValidacionTexto = ''
    }



    return valido
  }
}
