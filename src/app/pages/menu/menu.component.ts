import { ActivatedRoute } from '@angular/router';
import { MenuService } from './../../_service/menu.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Menu } from './../../_model/menu';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dataSource: MatTableDataSource<Menu>;
  displayedColumns = ['idMenu', 'icono', 'nombre', 'url', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private menuService: MenuService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
    this.menuService.listar().subscribe( data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.menuService.menuCambio.subscribe( data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });



  }

}
