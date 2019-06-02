import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/_model/rol';
import { RolService } from 'src/app/_service/rol.service';

@Component({
  selector: 'app-rol-edicion',
  templateUrl: './rol-edicion.component.html',
  styleUrls: ['./rol-edicion.component.css']
})
export class RolEdicionComponent implements OnInit {


  id: number;
  form: FormGroup;
  edicion: boolean = false;
  rol: Rol;
  //generos: Genero[];
  //idGeneroSeleccionado: number;
  //urlImagen: string;

  constructor(private rolService: RolService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'idRol': new FormControl(0),
      'nombre': new FormControl(''),
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });
  }

  initForm() {

    if (this.edicion) {
      this.rolService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idMenu': new FormControl(data.idRol),
          'nombre': new FormControl(data.nombre),
        });

      });
    }
  }


  operar() {
    let menu = new Rol();
    menu.idRol = this.form.value['idRol'];
    menu.nombre = this.form.value['nombre'];

    if (this.edicion) {
      this.rolService.modificar(menu).subscribe(() => {
        this.rolService.listar().subscribe(data => {
          this.rolService.rolCambio.next(data);
          this.rolService.mensajeCambio.next('SE MODIFICO');
        });
      });
    } else {
      this.rolService.registrar(menu).subscribe(() => {
        this.rolService.listar().subscribe(data => {
          this.rolService.rolCambio.next(data);
          this.rolService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }

    this.router.navigate(['rol']);

  }


}
