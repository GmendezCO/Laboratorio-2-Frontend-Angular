import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CategoriaListComponent } from './components/categorias/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './components/categorias/categoria-form/categoria-form.component';
import { ProductoListComponent } from './components/productos/producto-list/producto-list.component';
import { ProductoFormComponent } from './components/productos/producto-form/producto-form.component';
import { UsuarioListComponent } from './components/usuarios/usuario-list/usuario-list.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  // Accesibles para cualquier usuario autenticado
  { path: 'categorias', component: CategoriaListComponent, canActivate: [authGuard] },
  { path: 'productos', component: ProductoListComponent, canActivate: [authGuard] },

  // Accesibles SOLO para SUPER-ADMIN-ROLE
  { path: 'categorias/nuevo', component: CategoriaFormComponent, canActivate: [authGuard, adminGuard] },
  { path: 'categorias/editar/:id', component: CategoriaFormComponent, canActivate: [authGuard, adminGuard] },

  { path: 'productos/nuevo', component: ProductoFormComponent, canActivate: [authGuard, adminGuard] },
  { path: 'productos/editar/:id', component: ProductoFormComponent, canActivate: [authGuard, adminGuard] },

  { path: 'usuarios', component: UsuarioListComponent, canActivate: [authGuard, adminGuard] },

  { path: '**', redirectTo: 'login' }
];
