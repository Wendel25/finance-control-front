import { Component } from '@angular/core';

import { MenuComponent } from '../../components/menu/menu.component';
import { RegisterItensComponent } from './register-itens/register-itens.component';
import { RegisterServiceComponent } from './register-service/register-service.component';
import { RegisterNewItensComponent } from './register-new-itens/register-new-itens.component';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RegisterNewItensComponent,
    RegisterServiceComponent,
    RegisterItensComponent,
    MenuComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent{}
