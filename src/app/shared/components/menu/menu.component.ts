import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule  } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,

    CommonModule,
    RouterModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent {
  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

  btn = [
    {icon: 'app_registration', label: 'Geral', routerLink: '/Registrar'},
    {icon: 'engineering', label: 'Externos', routerLink: '/Todos-registros'},
    {icon: 'inventory_2 ', label: 'Produtos', routerLink: '/Produtos'},
    {icon: 'real_estate_agent', label: 'Vendas', routerLink: '/Vender'}
  ]

  dashboardNavigation(){
    this.router.navigate(['Dashboard']);
  }

  logoutNavigation(){
    this.cookieService.delete('token');
    this.cookieService.delete('name');

    this.router.navigate(['']);
  }
}
