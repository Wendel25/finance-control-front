import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SaleComponent } from './pages/sale/sale.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'Dashboard', component: DashboardComponent},
  { path: 'Registrar', component: RegisterComponent},
  { path: 'Categorias', component: CategoriesComponent},
  { path: 'Vender', component: SaleComponent},
];
