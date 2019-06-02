import { RolMenuComponent } from './pages/rol-menu/rol-menu.component';
import { RolUsuarioEdicionComponent } from './pages/rol-usuario/rol-usuario-edicion/rol-usuario-edicion.component';
import { RolEdicionComponent } from './pages/rol/rol-edicion/rol-edicion.component';
import { NuevoComponent } from './pages/login/nuevo/nuevo.component';
import { Not401Component } from './pages/not401/not401.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { VentaComponent } from './pages/venta/venta.component';
import { ComidaComponent } from './pages/comida/comida.component';
import { PeliculaEdicionComponent } from './pages/pelicula/pelicula-edicion/pelicula-edicion.component';
import { GeneroComponent } from './pages/genero/genero.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { LoginComponent } from './pages/login/login.component';
import { GuardService } from './_service/guard.service';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuEdicionComponent } from './pages/menu/menu-edicion/menu-edicion.component';
import { RolComponent } from './pages/rol/rol.component';
import { RolUsuarioComponent } from './pages/rol-usuario/rol-usuario.component';
import { RolMenuEdicionComponent } from './pages/rol-menu/rol-menu-edicion/rol-menu-edicion.component';

const routes: Routes = [
  { path: 'genero', component: GeneroComponent, canActivate: [GuardService] },
  {
    path: 'pelicula', component: PeliculaComponent, children: [
      { path: 'nuevo', component: PeliculaEdicionComponent },
      { path: 'edicion/:id', component: PeliculaEdicionComponent }
    ], canActivate: [GuardService]
  },

  {
    path: 'rol', component: RolComponent, children: [
      { path: 'nuevo', component: RolEdicionComponent },
      { path: 'edicion/:id', component: RolEdicionComponent }
    ], canActivate: [GuardService]
  },

  {
    path: 'menu', component: MenuComponent, children: [
      { path: 'nuevo', component: MenuEdicionComponent },
      { path: 'edicion/:id', component: MenuEdicionComponent }
    ], canActivate: [GuardService]
  },

  {
    path: 'rol-usuario', component: RolUsuarioComponent, children: [
      { path: 'asignar/:id', component: RolUsuarioEdicionComponent }
    ], canActivate: [GuardService]
  },

  {
    path: 'rol-menu', component: RolMenuComponent, children: [
      { path: 'asignar/:id', component: RolMenuEdicionComponent }
    ], canActivate: [GuardService]
  },

  { path: 'comida', component: ComidaComponent, canActivate: [GuardService] },
  { path: 'venta', component: VentaComponent, canActivate: [GuardService] },
  { path: 'consulta', component: ConsultaComponent, canActivate: [GuardService] },
  { path: 'reporte', component: ReporteComponent, canActivate: [GuardService] },
  { path: 'configuracion', component: ConfiguracionComponent, canActivate: [GuardService] },

  { path: 'login', component: LoginComponent },
  { path: 'nuevo-usuario', component: NuevoComponent },
  { path: 'not-401', component: Not401Component },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
