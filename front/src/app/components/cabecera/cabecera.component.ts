import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Categoria } from '../../interface/categoria';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CategoriasService } from '../../services/categorias.service';
import { MenuItem } from 'primeng/api';
import { MenubarModule,MenubarTemplates } from 'primeng/menubar';
import { NuevaCategoriaComponent } from '../nueva-categoria/nueva-categoria.component';
@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterLink,
    FormsModule,
    MenubarModule,
    NuevaCategoriaComponent
   ],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css',
  providers:[CategoriasService],
  encapsulation: ViewEncapsulation.None
})
export class CabeceraComponent implements OnInit {
  constructor(
    private servicioCategoria:CategoriasService,
    private router: Router,
  ){}
    modalVisible=false

  items: MenuItem[] | undefined;
  subscripcionCategorias: Subscription=new Subscription;
  listaCategorias:Array<Categoria>=[]
    @Input() admin=true
    adminItems: MenuItem[] | undefined=[
      {
        label:'Administrar categorias',
        command:()=>{this.router.navigate(['/admin/categorias'])},
        items:[
          {
            label:'Crear categoria',
            icon: 'pi pi-plus',

            command:()=>{this.modalVisible=true},
            
          },
          {
            label:'Editar categoria',
            icon: 'pi pi-pencil',
            command:()=>{this.router.navigate(['/admin/categorias/nueva'])},
          },
          {
            label:'Eliminar categoria',
            icon: 'pi pi-trash',
            command:()=>{this.router.navigate(['/admin/categorias/nueva'])},
          }
        ]
      }
    ]
  ngOnInit(): void {
    console.log('llega')
    this.subscripcionCategorias = this.servicioCategoria.getAllCategoriasAgrupadas().subscribe({
      next: (data: any) => {
        this.listaCategorias=data
        this.items=this.crearMenu(this.listaCategorias)
       this.items?.unshift({label:'Inicio',url:''})
       this.items?.push({label:'Login', url:'/login'})
      },
      error: (err) => {
        console.log(err);
      }
      
    });
  //   this.items = [
  //     {
  //         label: 'File',
  //         icon: 'pi pi-fw pi-file',
  //         items: [
  //             {
  //                 label: 'New',
  //                 icon: 'pi pi-fw pi-plus',
  //                 items: [
  //                     {
  //                         label: 'Bookmark',
                
  //                     },
  //                     {
  //                         label: 'Video',
  //                         icon: 'pi pi-fw pi-Bookmark'
  //                     }
  //                 ]
  //             },
  //             {
  //                 label: 'Delete',
  //                 icon: 'pi pi-fw pi-trash'
  //             },
            
  //             {
  //                 label: 'Export',
  //                 icon: 'pi pi-fw pi-external-link'
  //             }
  //         ]
  //     },
     
  // ];
  }

  crearMenu(lista:Array<Categoria>): Array<MenuItem> | undefined{
    let l:Array<MenuItem>=[]
    console.log('llega')
    for(const elemento of lista){
      console.log('llega2')
    let item: MenuItem = {
        label: elemento.nombre,
        url:'/categoria/'+elemento.id,
        items: [] as MenuItem[]  
      }
      if(elemento.subcategorias!.length>0){
        console.log('llega3')
       let subcategorias=this.crearMenu(elemento.subcategorias!)
       item.items = subcategorias
      }
      
      l.push(item); 
    }
    return l
}
}
