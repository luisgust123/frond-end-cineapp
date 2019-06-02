import { MenuService } from './../../../_service/menu.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Menu } from './../../../_model/menu';
import { Rol } from './../../../_model/rol';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/_service/rol.service';

@Component({
  selector: 'app-rol-menu-edicion',
  templateUrl: './rol-menu-edicion.component.html',
  styleUrls: ['./rol-menu-edicion.component.css']
})
export class RolMenuEdicionComponent implements OnInit {

  rolSeleccionado: any;
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  roles: Rol[] ;
  rolesActuales: any;
  rolesNuevos: any ;


  menu: Menu;

  constructor(private rolService: RolService, private menuService: MenuService,
    private route: ActivatedRoute, private router: Router ){ }

  ngOnInit() {

    this.rolService.listar().subscribe(data => {
      this.roles = data
    })


    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });

  }


  initForm() {

    if (this.edicion) {
      this.menuService.listarPorId(this.id).subscribe(data => {
        this.menu = new Menu();
        this.menu.idMenu = data.idMenu;
        this.menu.nombre = data.nombre;
        this.menu.roles = data.roles;

        this.rolesActuales = new Array();
        this.rolesActuales =data.roles
        //this.rolesNuevos = data.roles



      });
    }
  }
  agregar(){

    console.log(this.rolSeleccionado.idRol)
    let existe :boolean = false;
    for(var i =0 ; i < this.menu.roles.length; i++){
      if ( this.menu.roles[i].idRol == this.rolSeleccionado.idRol) {
         existe  = true;
      }
    }
    if(existe == false){
      this.menu.roles.push(this.rolSeleccionado)
    }

  }

  quitar(id: number){
    console.log(id)

    for(var i =0 ; i < this.menu.roles.length; i++){
      if ( this.menu.roles[i].idRol == id) {
        this.menu.roles.splice(i, 1);
        break;
      }
    }
  
  }


guardar(){
  
  this.menuService.asignar(this.menu).subscribe( () => {
    this.menuService.asignacionCambio.next("SE ASIGNO ROLES A MENU")
  } );

  this.router.navigate(['/rol-menu'])
}


}
