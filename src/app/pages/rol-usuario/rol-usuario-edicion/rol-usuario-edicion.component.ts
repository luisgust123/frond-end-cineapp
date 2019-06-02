import { FormGroup, FormControl } from '@angular/forms';
import { Rol } from './../../../_model/rol';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsuarioService } from './../../../_service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/_service/rol.service';
import { Usuario } from 'src/app/_model/usuario';

@Component({
  selector: 'app-rol-usuario-edicion',
  templateUrl: './rol-usuario-edicion.component.html',
  styleUrls: ['./rol-usuario-edicion.component.css']
})
export class RolUsuarioEdicionComponent implements OnInit {

  rolSeleccionado: any;
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  roles: Rol[] ;
  rolesActuales: any;
  rolesNuevos: any ;


  usuario: Usuario;

  constructor(private rolService: RolService, private usuarioService: UsuarioService,
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
      this.usuarioService.listarPorId(this.id).subscribe(data => {
        this.usuario = new Usuario();
        this.usuario.idUsuario = data.idUsuario;
        this.usuario.username = data.username;
        this.usuario.roles = data.roles;

        this.rolesActuales = new Array();
        this.rolesActuales =data.roles
        //this.rolesNuevos = data.roles



      });
    }
  }
  agregar(){

    console.log(this.rolSeleccionado.idRol)
    let existe :boolean = false;
    for(var i =0 ; i < this.usuario.roles.length; i++){
      if ( this.usuario.roles[i].idRol == this.rolSeleccionado.idRol) {
         existe  = true;
      }
    }
    if(existe == false){
      this.usuario.roles.push(this.rolSeleccionado)
    }

  }

  quitar(id: number){
    console.log(id)

    for(var i =0 ; i < this.usuario.roles.length; i++){
      if ( this.usuario.roles[i].idRol == id) {
        this.usuario.roles.splice(i, 1);
        break;
      }
    }
  
  }


guardar(){
  
  this.usuarioService.modificar(this.usuario).subscribe(() =>{
    this.usuarioService.asignacionCambio.next("SE ASIGNO ROLES A USUARIO")
  } );

  this.router.navigate(['/rol-usuario'])
}




}
