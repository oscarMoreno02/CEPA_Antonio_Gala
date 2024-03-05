import { Component, Input, ViewEncapsulation, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { Noticia } from '../../interface/noticia';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { TagModule } from 'primeng/tag';
//Óscar
@Component({
  selector: 'app-preview-noticia',
  standalone: true,
  imports: [ImageModule, CardModule,RouterLink,TagModule],
  templateUrl: './preview-noticia.component.html',
  styleUrl: './preview-noticia.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PreviewNoticiaComponent {
@Input() noticia!:Noticia
constructor(private router: Router){}
env=environment
httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
esUrl(foto:string):Boolean{
  return this.httpRegex.test(foto)
  }
}
