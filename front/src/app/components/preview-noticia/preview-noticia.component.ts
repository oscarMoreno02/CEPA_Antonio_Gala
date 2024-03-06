import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { Noticia } from '../../interface/noticia';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { TagModule } from 'primeng/tag';
import { AuthService } from '../../services/auth.service';
//Óscar
@Component({
  selector: 'app-preview-noticia',
  standalone: true,
  imports: [ImageModule, CardModule,RouterLink,TagModule],
  templateUrl: './preview-noticia.component.html',
  styleUrl: './preview-noticia.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PreviewNoticiaComponent implements OnInit {
@Input() noticia!:Noticia
constructor(private router: Router,private authService:AuthService){
}
ngOnInit(): void {
  this.authService.clearAccess()
}
env=environment
httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
esUrl(foto:string):Boolean{
  return this.httpRegex.test(foto)
  }
}
