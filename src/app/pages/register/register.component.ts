import { Component } from '@angular/core';

import { MenuComponent } from '../../components/menu/menu.component';
import { RegisterItensComponent } from './register-itens/register-itens.component';
import { RegisterServiceComponent } from './register-service/register-service.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RegisterServiceComponent,
    RegisterItensComponent,
    MenuComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent{}
