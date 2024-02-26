import { EnvironmentInjector, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { io } from "socket.io-client";
import { Noticia } from '../interface/noticia';
import { MessageService } from 'primeng/api';
//Óscar
@Injectable({
  providedIn: 'root',

})
export class WebSocketService  {
socket?:any
  private url=environment.urlNoticiasSocket

constructor(private message:MessageService) {
    this.socket = io(this.url, {

})
;
this.socket.on("connect", () => {
  console.log(this.socket.id);
});


this.socket.on("recibir-notificacion", (data:Noticia) => {
  console.log(data)
  this.message.add({ severity: 'info', id:'unique-message-id', summary: 'Nueva noticia', detail:`<a href="${data.titulo}" target="_blank">${data.titulo}</a>`, life: 6000 });
  setTimeout(() => {
    const messageElement = document.querySelector('#unique-message-id .p-toast-detail');
    if (messageElement) {
      const link = document.createElement('a');
      link.href = '/categoria/'+data.idCategoria!.toString(); 
      link.textContent = 'Ver noticia'; 
      link.target = '_blank'; 
      const content = 'Titulo:  <br> <br> ' + data.titulo + ' <br>   <br>';
      messageElement.innerHTML = content;
      messageElement.appendChild(link);
    }
  },  0);
});
}
public sendNoticifacion(message: Noticia): void {
    this.socket.emit('enviar-notificacion', message);
  }

}