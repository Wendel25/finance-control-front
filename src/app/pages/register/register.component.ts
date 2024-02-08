import { Component } from '@angular/core';

import { MenuComponent } from '../../components/menu/menu.component';
import { RegisterItensComponent } from './register-itens/register-itens.component';
import { RegisterServiceComponent } from './register-service/register-service.component';
import { RegisterNewItensComponent } from './menu/register-new-itens/register-new-itens.component';
import { RegisterSaleComponent } from './register-sale/register-sale.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RegisterNewItensComponent,
    RegisterServiceComponent,
    RegisterItensComponent,
    MenuComponent,
    RegisterSaleComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent{}
