import { ActivatedRoute } from '@angular/router';
import { MenuService } from './../../_service/menu.service';
import { Menu } from './../../_model/menu';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rol-menu',
  templateUrl: './rol-menu.component.html',
  styleUrls: ['./rol-menu.component.css']
})
export class RolMenuComponent implements OnInit {

  
  dataSource: MatTableDataSource<Menu>;
  displayedColumns = ['idMenu', 'nombre', 'url', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private menuService : MenuService,  private snackBar: MatSnackBar, public route: ActivatedRoute) { }


  ngOnInit() {
    this.menuService.listar().subscribe( data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.menuService.asignacionCambio.subscribe(data => {
      this.snackBar.open(data, 'INFO', {
        duration: 2000
      });
    });
  }
}
