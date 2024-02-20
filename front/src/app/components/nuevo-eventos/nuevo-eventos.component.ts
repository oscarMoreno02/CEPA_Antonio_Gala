
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { NoticiaService } from '../../services/noticia.service';
import { Router } from '@angular/router';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-nuevo-eventos',
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
  ],
  templateUrl: './nuevo-eventos.component.html',
  styleUrl: './nuevo-eventos.component.css',
  providers:[DialogService, MessageService, EventosService]
})
export class NuevoEventosComponent implements OnInit{
  constructor(
    public messageService:MessageService,
    private servicioEvento: EventosService,
    private router:Router,
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  @Input() visible: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>();
  value = ''
  validacionTitulo = ''
  validacionDescripcion = ''
  visibiliad = false

  formularioFoto: FormData | null = null
  fotoPreview: string | null = null
  
  showDialog() {
    this.visible = true;
  }
  cerrar(): void {
    this.cerrarModal.emit();
  }
  uplodadFoto(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.formularioFoto = new FormData()
      this.formularioFoto.append('archivo', file)
      this.fotoPreview = URL.createObjectURL(file);
      console.log(this.formularioFoto)
    } else {
      this.formularioFoto = null
    }
  }
  limpiarFoto(archivo: any) {
    archivo.value = null
    this.formularioFoto = null
    this.fotoPreview = null
  }
  crear(b:Boolean){

  }
}
