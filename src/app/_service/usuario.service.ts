import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Usuario } from '../_model/usuario';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  asignacionCambio  = new Subject<string>();

  url: string = `${environment.HOST_URL}/usuarios`;
  constructor(private http: HttpClient) { }
  
  registrar(usuario: Usuario) {
    return this.http.post(this.url, usuario);
  }


  modificar(usuario: Usuario) {
    return this.http.put(this.url, usuario);
  }

  listar (){
    return this.http.get<Usuario[]>(this.url);
  }

  listarPorId (id : number){
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

}
