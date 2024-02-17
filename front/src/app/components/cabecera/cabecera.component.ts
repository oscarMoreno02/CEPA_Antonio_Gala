import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categoria } from '../../interface/categoria';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from '../../services/categorias.service';
import { MenuItem } from 'primeng/api';
import { MenubarModule, MenubarTemplates } from 'primeng/menubar';
import { NuevaCategoriaComponent } from '../nueva-categoria/nueva-categoria.component';
import { NuevaNoticiaComponent } from '../nueva-noticia/nueva-noticia.component';
import { LoginComponent } from '../login/login.component';
import { ProfileIconComponent } from '../profile-icon/profile-icon.component';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterLink,
    FormsModule,
    MenubarModule,
    NuevaCategoriaComponent,
    NuevaNoticiaComponent,
    LoginComponent,
    ProfileIconComponent,
    RouterLink
  ],

  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css',
  providers: [CategoriasService],
  encapsulation: ViewEncapsulation.None
})
export class CabeceraComponent implements OnInit {
  constructor(
    private servicioCategoria: CategoriasService,
    private router: Router,
    public servicioAutenticacion:AuthService,
    
  ) { }
  @Output() eventoLogin = new EventEmitter<boolean>();
  modalCategoriaNueva = false
  modalNoticiaNueva = false
  modalLogin = false
  items: MenuItem[] | undefined;
  subscripcionCategorias: Subscription = new Subscription;
  listaCategorias: Array<Categoria> = []

  @Input() admin = true

  @Input() isLogged = false

username=''
userroles:Array<string>=[]
  adminItems: MenuItem[] | undefined = [
    {
      label: 'Administrar categorias',
      command: () => { this.router.navigate(['/admin/categorias']) },
      items: [
        {
          label: 'Crear categoria',
          icon: 'pi pi-plus',

          command: () => { this.modalCategoriaNueva = true },

        },
        {
          label: 'Eliminar categoria',
          icon: 'pi pi-trash',
          command: () => { this.router.navigate(['/admin/categorias/nueva']) },
        }
      ]
    },
    {
      label: 'Administrar noticias',
      command: () => { this.router.navigate(['/admin/noticias']) },
      items: [
        {
          label: 'Crear noticia',
          icon: 'pi pi-plus',
          command: () => { this.modalNoticiaNueva = true },
        },
        {
          label: 'Eliminar categoria',
          icon: 'pi pi-trash',
          command: () => { this.router.navigate(['/admin/noticias/nueva']) },
        }
      ]
    }
  ]
  ngOnInit(): void {

    this.subscripcionCategorias = this.servicioCategoria.getAllCategoriasAgrupadas().subscribe({
      next: (data: any) => {
        this.listaCategorias = data

        this.items = this.crearMenu(this.listaCategorias)
        this.items?.unshift({ label: 'Inicio',command: () => { this.router.navigate(['']) }, })
      },
      error: (err) => {
    
      }

    });

  }

  crearMenu(lista: Array<Categoria>): Array<MenuItem> | undefined {
    let l: Array<MenuItem> = []

    for (const elemento of lista) {

      let item: MenuItem = {
        label: elemento.nombre,
        url:'/categoria/' + elemento.id,
        replaceUrl:true,
        // command: () => { this.router.navigateByUrl('/categoria/' + elemento.id) },
        items: [] as MenuItem[]
      }
      if (elemento.subcategorias!.length > 0) {

        let subcategorias = this.crearMenu(elemento.subcategorias!)
        item.items = subcategorias
      }

      l.push(item);
    }
    return l
  }
  login(b: boolean) {
    if (b) {

      this.isLogged = true
      this.eventoLogin.emit(true)
      this.username=this.servicioAutenticacion.getName()
      this.userroles=this.servicioAutenticacion.getRoles()

    }
  }

}