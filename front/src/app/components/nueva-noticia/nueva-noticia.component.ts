

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
import { Subscription } from 'rxjs';
import { Categoria } from '../../interface/categoria';
import { Noticia } from '../../interface/noticia';
import { NoticiaService } from '../../services/noticia.service';
import { Router } from '@angular/router';
import { FotosNoticiasService } from '../../services/fotosNoticias.service';
import { WebSocketService } from '../../services/websocket.service';
//Óscar
@Component({
  selector: 'app-nueva-noticia',
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
  templateUrl: './nueva-noticia.component.html',
  styleUrl: './nueva-noticia.component.css',
  providers: [DialogService, MessageService, CategoriasService, NoticiaService]
})

export class NuevaNoticiaComponent implements OnInit {
  constructor(
    public messageService: MessageService,
    private servicioCategoria: CategoriasService,
    private servicioNoticia: NoticiaService,
    private router: Router,
    private servicioFotos: FotosNoticiasService,
    
  ) { }

  @Input() visible: boolean = false;
  @Input() tipo = 0
  @Output() cerrarModal = new EventEmitter<void>();
  value = ''
  httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  subscripcionNoticia: Subscription = new Subscription;
  listaCategorias: Array<Categoria> = []
  categoriaDependiente?: Categoria
  enlace = false
  url?: string
  nuevaNoticia: Noticia = { id: null, titulo: '', idCategoria: null }

  estiloValidacionNombre = ''
  estiloValidacionDependiente = ''
  estiloValidacionUrl = ''

  formularioFoto: FormData | null = null
  fotoPreview: string | null = null

  ngOnInit(): void {
    this.subscripcionNoticia = this.servicioCategoria.getAllCategorias().subscribe({
      next: (data: any) => {
        this.listaCategorias = data
      },
      error: (err) => {

      }
    });
  }
  showDialog() {
    this.visible = true;
  }
  cerrar(): void {
    this.cerrarModal.emit();
  }
  crear(b: Boolean) {
    if (b) {

      if (this.validarCampos()) {
        if (this.formularioFoto != null) {
          this.messageService.add({ severity: 'info', summary: 'Crear Categoria', detail: 'En curso', life: 3000 });
          this.servicioFotos.uploadFoto(this.formularioFoto).subscribe({
            next: (data: any) => {
              this.nuevaNoticia.foto = data.url
              this.servicioNoticia.insertNoticia(this.nuevaNoticia).subscribe({
                next: (u: any) => {
                    
                  setTimeout(() => {
                    this.messageService.add({ severity: 'success', summary: 'Crear Noticia', detail: 'Completada', life: 3000 });
                    setTimeout(() => {
                      this.router.navigate(['/noticia/contenido', u.id])

                    }, 1000);
                  }, 1000);

                },
                error: (err) => {
            
                  this.messageService.add({ severity: 'error', summary: 'Crear Noticia', detail: 'Cancelada', life: 3000 });
                }
              })
            }
          })

        }else{
          this.nuevaNoticia.foto=null
          this.messageService.add({ severity: 'info', summary: 'Crear Categoria', detail: 'En curso', life: 3000 });
          this.servicioNoticia.insertNoticia(this.nuevaNoticia).subscribe({
            next: (u: any) => {
   
              setTimeout(() => {
                
                this.messageService.add({ severity: 'success', summary: 'Crear Noticia', detail: 'Completada', life: 3000 });
                setTimeout(() => {
                  this.router.navigate(['/noticia/contenido', u.id])

                }, 1000);
              }, 1000);

            },
            error: (err) => {
      
              this.messageService.add({ severity: 'error', summary: 'Crear Noticia', detail: 'Cancelada', life: 3000 });
            }
          })
        }
      }
    }
  }
  validarCampos(): Boolean {
    this.nuevaNoticia.enlace = null
    let valido = true
    if (this.nuevaNoticia.titulo.split(' ').join('').length < 5) {
      this.estiloValidacionNombre = 'ng-invalid ng-dirty'
      valido = false
      this.messageService.add({ severity: 'warn', summary: 'Crear Noticia', detail: 'Tamaño de titulo incorrecto', life: 3000 });
    } else {
      this.estiloValidacionNombre = ''
    }

    if (this.categoriaDependiente == undefined) {
      this.estiloValidacionDependiente = 'ng-invalid ng-dirty'
      valido = false
      this.messageService.add({ severity: 'warn', summary: 'Crear Noticia', detail: 'No se ha seleccionado una categoria', life: 3000 });

    } else {
      this.nuevaNoticia.idCategoria = this.categoriaDependiente.id
      this.estiloValidacionDependiente = ''
    }
    if (this.enlace) {
      if (this.url != undefined) {
        if (!this.httpRegex.test(this.url)) {
          this.estiloValidacionUrl = 'ng-invalid ng-dirty'
          valido = false
          this.messageService.add({ severity: 'warn', summary: 'Crear Noticia', detail: 'Dirección URL inválida ', life: 3000 });
        } else {
          this.nuevaNoticia.enlace = this.url
          this.estiloValidacionUrl = ''
        }
      } else {
        valido = false
        this.estiloValidacionUrl = 'ng-invalid ng-dirty'
        this.messageService.add({ severity: 'warn', summary: 'Crear Noticia', detail: 'Direccion URL no introducida ', life: 3000 });
      }
    } else {
      this.estiloValidacionUrl = ''
    }
    return valido
  }

  uplodadFoto(event: any) {
    const file = event.target.files[0]
    if (file) {
      const permitidas = ['.jpeg', '.jpg', '.png'];
      const fichero = file.name.toLowerCase();
      const extension = fichero.substring(fichero.lastIndexOf('.'));
    
      if (permitidas.includes(extension)) {
      this.formularioFoto = new FormData()
      this.formularioFoto.append('archivo', file)
      this.fotoPreview = URL.createObjectURL(file);
      }else{
        this.messageService.add({ severity: 'warn', summary: 'Subir foto', detail: 'Extensión no valida ', life: 3000 });
        this.formularioFoto=null
      }
    } else {
      this.formularioFoto = null
    }
  }
  limpiarFoto(archivo: any) {
    archivo.value = null
    this.formularioFoto = null
    this.fotoPreview = null
  }
}
