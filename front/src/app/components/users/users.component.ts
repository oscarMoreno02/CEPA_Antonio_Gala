//Raúl

import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditableColumn, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NuevoUsuariosComponent } from '../nuevo-usuarios/nuevo-usuarios.component';
import { EditarUsuariosComponent } from '../editar-usuarios/editar-usuarios.component';
import { UsersService } from '../../services/users.service';
import { Users } from '../../interface/users';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HttpClientModule,
    RouterLink,
    TableModule,
    ButtonModule,
    EditarUsuariosComponent,
    NuevoUsuariosComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [UsersService]
})
export class UsersComponent {
  constructor(
    private servicioUsers : UsersService,
  ){}
  subscriptionUsers: Subscription=new Subscription;
  listaUsers:Array<Users>=[]
  @Input() admin=true

  ngOnInit(): void{
    this.subscriptionUsers = this.servicioUsers.usuariosGet().subscribe({
      next: (data: Array<Users>) => {
        this.listaUsers=data
       
      },
      error: (e) => {

      }
    })
  }
}
