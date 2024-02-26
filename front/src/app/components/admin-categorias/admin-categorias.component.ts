import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
import { Subscription } from 'rxjs';
import { Categoria } from '../../interface/categoria';
import { EditableColumn, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NuevaCategoriaComponent } from '../nueva-categoria/nueva-categoria.component';
import { EditarCategoriaComponent } from '../editar-categoria/editar-categoria.component';
//Óscar
@Component({
  selector: 'app-admin-categorias',
  standalone: true,
  imports: [ 
    HttpClientModule,
    RouterLink,
    TableModule,
    ButtonModule,
    NuevaCategoriaComponent,
    EditarCategoriaComponent
  ],
  templateUrl: './admin-categorias.component.html',
  styleUrl: './admin-categorias.component.css',
  providers:[CategoriasService],
})
export class AdminCategoriasComponent implements OnInit {
  constructor(
    private servicioCategoria:CategoriasService,
    private router: Router
  ){}
  subscripcionCategorias: Subscription=new Subscription;
  listaCategorias:Array<Categoria>=[]
    @Input() admin=true
  
  ngOnInit(): void {

    this.subscripcionCategorias = this.servicioCategoria.getAllCategorias().subscribe({
      next: (data: Array<Categoria>) => {
        this.listaCategorias=data
     
      },
      error: (err) => {

      }
      
    });
  }
}
