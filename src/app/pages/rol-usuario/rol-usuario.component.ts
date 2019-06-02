import { ActivatedRoute } from '@angular/router';
import { Usuario } from './../../_model/usuario';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { UsuarioService } from './../../_service/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rol-usuario',
  templateUrl: './rol-usuario.component.html',
  styleUrls: ['./rol-usuario.component.css']
})
export class RolUsuarioComponent implements OnInit {

  dataSource: MatTableDataSource<Usuario>;
  displayedColumns = ['idUsuario', 'username', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private usuarioService : UsuarioService,  private snackBar: MatSnackBar, public route: ActivatedRoute) { }


  ngOnInit() {
    this.usuarioService.listar().subscribe( data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.usuarioService.asignacionCambio.subscribe(data => {
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });
  }

}
