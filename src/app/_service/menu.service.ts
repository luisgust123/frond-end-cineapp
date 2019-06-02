import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Menu } from './../_model/menu';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuCambio = new Subject<Menu[]>();

  mensajeCambio = new Subject<string>();

  asignacionCambio = new Subject<string>();

  url: string = `${environment.HOST_URL}`;

  constructor(private http: HttpClient) { }

  listar() {
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;

    return this.http.get<Menu[]>(`${this.url}/menus`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }


  listarPorId(id: number) {

    return this.http.get<Menu>(`${this.url}/menus/${id}`);
  }


  registrar(genero: Menu) {
    return this.http.post(`${this.url}/menus`, genero);
  }

  modificar(genero: Menu) {
    return this.http.put(`${this.url}/menus`, genero);
  }

  eliminar(genero: Menu) {
    return this.http.delete(`${this.url}/menus/${genero.idMenu}`);
  }

  asignar(menu: Menu) {
    return this.http.put(`${this.url}/menus/menu-rol`,menu);
  }

  listarPorUsuario(nombre: string) {
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    return this.http.post<Menu[]>(`${this.url}/menus/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
