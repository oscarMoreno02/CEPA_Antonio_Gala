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
import { AulaService } from '../../services/aula.service';
import { Aula } from '../../interface/aula';
@Component({
  selector: 'app-lista-aulas',
  standalone: true,
  imports: [ 
    HttpClientModule,
    RouterLink,
    TableModule,
    ButtonModule,
    NuevaCategoriaComponent,
    EditarCategoriaComponent
  ],
  providers:[AulaService],
  templateUrl: './lista-aulas.component.html',
  styleUrl: './lista-aulas.component.css'
})
export class ListaAulasComponent implements OnInit{
constructor(    
  private servicioAulas:AulaService,
  private router: Router){}
  subscripcionAulas: Subscription=new Subscription;
  listaAulas:Array<Aula>=[]
  ngOnInit(): void {
    this.subscripcionAulas = this.servicioAulas.getAllAulas().subscribe({
      next: (data: Array<Aula>) => {
        this.listaAulas=data
      },
      error: (err) => {
        
      }
      
    });
  }

  }

