import { MenuService } from './../../../_service/menu.service';
import { Menu } from './../../../_model/menu';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-menu-edicion',
  templateUrl: './menu-edicion.component.html',
  styleUrls: ['./menu-edicion.component.css']
})
export class MenuEdicionComponent implements OnInit {


  id: number;
  form: FormGroup;
  edicion: boolean = false;
  menu: Menu;
  //generos: Genero[];
  //idGeneroSeleccionado: number;
  //urlImagen: string;

  constructor(private menuService: MenuService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'idMenu': new FormControl(0),
      'nombre': new FormControl(''),
      'url': new FormControl(''),
      'icono': new FormControl(''),
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });
  }

  initForm() {

    if (this.edicion) {
      this.menuService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idMenu': new FormControl(data.idMenu),
          'nombre': new FormControl(data.nombre),
          'icono': new FormControl(data.icono),
          'url': new FormControl(data.url),
        });

      });
    }
  }


  operar() {
    let menu = new Menu();
    menu.idMenu = this.form.value['idMenu'];
    menu.nombre = this.form.value['nombre'];
    menu.icono = this.form.value['icono'];
    menu.url = this.form.value['url'];

    if (this.edicion) {
      this.menuService.modificar(menu).subscribe(() => {
        this.menuService.listar().subscribe(data => {
          this.menuService.menuCambio.next(data);
          this.menuService.mensajeCambio.next('SE MODIFICO');
        });
      });
    } else {
      this.menuService.registrar(menu).subscribe(() => {
        this.menuService.listar().subscribe(data => {
          this.menuService.menuCambio.next(data);
          this.menuService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }

    this.router.navigate(['menu']);

  }




}
