import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../_model/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  rolCambio = new Subject<Rol[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST_URL}/roles`;


  constructor(private http: HttpClient) { }



 listar() {

    return this.http.get<Rol[]>(`${this.url}`);
  }

  listarPorId(id: number) {

    return this.http.get<Rol>(`${this.url}/${id}`);
  }


  registrar(rol: Rol) {
    return this.http.post(`${this.url}`, rol);
  }

  modificar(rol: Rol) {
    return this.http.put(`${this.url}`, rol);
  }

  eliminar(rol: Rol) {
    return this.http.delete(`${this.url}/${rol.idRol}`);
  }



}
