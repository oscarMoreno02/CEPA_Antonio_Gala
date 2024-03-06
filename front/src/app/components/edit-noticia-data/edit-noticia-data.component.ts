import { Component, Input, OnInit } from '@angular/core';
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
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../interface/noticia';
import { FotosNoticiasService} from '../../services/fotosNoticias.service';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
//Óscar
@Component({
  selector: 'app-edit-noticia-data',
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
    EditNoticiaDataComponent,
    FileUploadModule
  ],
  providers: [CategoriasService, NoticiaService, DialogService, MessageService,],
  templateUrl: './edit-noticia-data.component.html',
  styleUrl: './edit-noticia-data.component.css'
})
export class EditNoticiaDataComponent implements OnInit {
  constructor(
    public messageService: MessageService,
    private servicioCategoria: CategoriasService,
    private servicioNoticia: NoticiaService,
    private servicioFotos: FotosNoticiasService,
    private router:Router
  ) { }


  @Input() visible: boolean = false;
  @Input() tipo = 0
  value = ''
  categoria: Categoria = { id: 0, nombre: '', dependiente: null }
  categoriaDependiente?: Categoria
  @Input() listaCategorias: Array<Categoria> = []
  @Input() id?: number
  subscripcionCategorias: Subscription = new Subscription;

  httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

  noticiaEditar: Noticia = { id: null, titulo: '', idCategoria: null, }
  estiloValidacionNombre = ''
  estiloValidacionDependiente = ''
  estiloValidacionUrl = ''

  enlace?: boolean
  url  = ''
  fotoAuxiliar : string ='null'
  formularioFoto: FormData | null = null
  fotoPreview: string | null = null

  ngOnInit(): void {
    this.enlace = false
  
    this.servicioNoticia.getNoticia(this.id!).subscribe({
      next: (n: Noticia) => {
        this.noticiaEditar = n
        for (const categoria of this.listaCategorias) {
          if (categoria.id == this.noticiaEditar.idCategoria) {
            this.categoriaDependiente = categoria
          }
        }
        if (this.noticiaEditar.enlace != undefined) {
          this.enlace = true
          this.url = this.noticiaEditar.enlace
        }
        if (this.noticiaEditar.foto != null) {
          this.fotoPreview = environment.baseUrl + environment.urlFotosNoticias + '/' + this.noticiaEditar.foto
          if (this.httpRegex.test(this.noticiaEditar.foto)){
            const fragmentos = this.noticiaEditar.foto.split('/');
            this.fotoAuxiliar=fragmentos[fragmentos.length-1]
            this.fotoPreview=this.noticiaEditar.foto
          }else{
            this.fotoAuxiliar=this.noticiaEditar.foto
            this.fotoPreview = environment.baseUrl + environment.urlFotosNoticias + '/' + this.noticiaEditar.foto
          }
        }
      },
      error: (err) => {
  
      }
    })
  }
  showDialog() {
    this.enlace = false
    this.servicioNoticia.getNoticia(this.id!).subscribe({
      next: (n: Noticia) => {
        this.noticiaEditar = n
        for (const categoria of this.listaCategorias) {
          if (categoria.id == this.noticiaEditar.idCategoria) {
            this.categoriaDependiente = categoria
          }
        }
        if (this.noticiaEditar.enlace != undefined) {
          this.enlace = true
          this.url = this.noticiaEditar.enlace
        }
        if (this.noticiaEditar.foto != null) {
         
          if (this.httpRegex.test(this.noticiaEditar.foto)){
            const fragmentos = this.noticiaEditar.foto.split('/');
            this.fotoAuxiliar=fragmentos[fragmentos.length-1]
            this.fotoPreview=this.noticiaEditar.foto
          }else{
            this.fotoPreview = environment.baseUrl + environment.urlFotosNoticias + '/' + this.noticiaEditar.foto
            this.fotoAuxiliar=this.noticiaEditar.foto
          }
        }
      },
      error: (err) => {
    
      }
    })
    this.visible = true
  }
  guardar(b: Boolean) {

    if (b) {
      if (this.validarCampos()) {
        if (this.formularioFoto) {
          this.messageService.add({ severity: 'info', summary: 'Editar Noticia', detail: 'En curso', life: 3000 });
          this.servicioFotos.updateFoto(this.fotoAuxiliar,this.formularioFoto).subscribe({
            next: (data:any) => {
              this.noticiaEditar.foto = data.url
              this.servicioNoticia.updateNoticia(this.noticiaEditar).subscribe({
                next: (u: any) => {
    
                  setTimeout(() => {
                    this.messageService.add({ severity: 'success', summary: 'Editar Noticia', detail: 'Completada', life: 3000 });
                    setTimeout(() => {
                          window.location.reload()
                    }, 1000);
                  }, 1000);

                },
                error: (err) => {
  
                  this.messageService.add({ severity: 'error', summary: 'Editar Noticia', detail: 'Cancelada', life: 3000 });
                }
              })
            }
          })
        } else {
          if (this.fotoPreview==null && this.noticiaEditar.foto != null) {
         
       
            this.servicioFotos.deleteFoto(this.fotoAuxiliar).subscribe({
              next: (data: any) => {
                this.noticiaEditar.foto = null
                this.messageService.add({ severity: 'info', summary: 'Editar Noticia', detail: 'En curso', life: 3000 });
                this.servicioNoticia.updateNoticia(this.noticiaEditar).subscribe({
                  next: (u: any) => {

                    setTimeout(() => {
                      this.messageService.add({ severity: 'success', summary: 'Editar Noticia', detail: 'Completada', life: 3000 });
                      setTimeout(() => {
                        window.location.reload()
                      }, 1000);
                    }, 1000);

                  },
                  error: (err) => {
          
                    this.messageService.add({ severity: 'error', summary: 'Editar Noticia', detail: 'Cancelada', life: 3000 });
                  }
                })
              }
            })

          } else {
            this.messageService.add({ severity: 'info', summary: 'Editar Noticia', detail: 'En curso', life: 3000 });
            this.servicioNoticia.updateNoticia(this.noticiaEditar).subscribe({
              next: (u: any) => {

                setTimeout(() => {
                  this.messageService.add({ severity: 'success', summary: 'Editar Noticia', detail: 'Completada', life: 3000 });
                  setTimeout(() => {
                    window.location.reload()
                  }, 1000);
                }, 1000);

              },
              error: (err) => {
     
                this.messageService.add({ severity: 'error', summary: 'Editar Noticia', detail: 'Cancelada', life: 3000 });
              }
            })
          }
        }


      }
    }
  }
  eliminar(b: Boolean) {

    if (b) {

      this.messageService.add({ severity: 'info', summary: 'Borrar Noticia', detail: 'En curso', life: 3000 });
      let id = this.noticiaEditar.id as number
      this.servicioNoticia.deleteNoticia(id).subscribe({
        next: (u: any) => {
   
          setTimeout(() => {
            this.messageService.add({ severity: 'success', summary: 'Borrar Noticia', detail: 'Completada', life: 3000 });
            setTimeout(() => {
              this.router.navigate(['/admin/noticias'])
            }, 1000);
          }, 1000);

        },
        error: (err) => {
        
          this.messageService.add({ severity: 'error', summary: 'Borrar Noticia', detail: 'Cancelada', life: 3000 });
        }
      })

    }
  }
  validarCampos(): Boolean {
    this.noticiaEditar.enlace = null
    let valido = true
    if (this.noticiaEditar.titulo.split(' ').join('').length < 5) {
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
      this.noticiaEditar.idCategoria = this.categoriaDependiente.id
      this.estiloValidacionDependiente = ''
    }
    if (this.enlace) {
      if (this.url != undefined) {
        if (!this.httpRegex.test(this.url)) {
          this.estiloValidacionUrl = 'ng-invalid ng-dirty'
          valido = false
          this.messageService.add({ severity: 'warn', summary: 'Crear Noticia', detail: 'Dirección URL inválida ', life: 3000 });
        } else {
          this.noticiaEditar.enlace = this.url
          this.estiloValidacionUrl = ''
        }
      } else {
        valido = false
        this.estiloValidacionUrl = 'ng-invalid ng-dirty'
        this.messageService.add({ severity: 'warn', summary: 'Crear Noticia', detail: 'Direccion URL no introducida ', life: 3000 });
      }
    } else {
      this.estiloValidacionUrl = ''
      this.noticiaEditar.enlace = null
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
    this.fotoPreview=null
  }
}

