import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FotosNoticiasService {

  baseUrl=environment.baseUrl+environment.urlFotosNoticias
  constructor(private http:HttpClient) { }

 
  uploadFoto(formdata:FormData): Observable<any> {
     return this.http.post<any>(this.baseUrl,formdata)
   }
   getFotoURL(id:string): Observable<any | undefined> {

    return this.http.get<any>(this.baseUrl+'/'+id).pipe(
      catchError((error) =>{
        return of(undefined)
      })
    )
  }
  deleteFoto(foto:string): Observable<any> {
    return this.http.delete<any>(this.baseUrl+'/'+foto)
  }
  updateFoto(previa:string,formdata:FormData): Observable<any> {
    return this.http.put<any>(this.baseUrl+'/'+previa,formdata)
  }
}
