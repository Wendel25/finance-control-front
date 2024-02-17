import { Routes } from '@angular/router';
import { AuthService } from './auth.service';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { SaleComponent } from './pages/sale/sale.component';
import { GeralExternalComponent } from './pages/geral-external/geral-external.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthService]},
  { path: 'Registrar', component: RegisterComponent, canActivate: [AuthService]},
  { path: 'Vender', component: SaleComponent, canActivate: [AuthService]},
  { path: 'Todos-registros', component: GeralExternalComponent, canActivate: [AuthService]},
];
