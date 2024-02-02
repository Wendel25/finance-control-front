import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule  } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip';

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
    private router: Router
  ) {}

  btn = [
    {icon: 'app_registration', label: 'Cadastrar', routerLink: '/Registrar'},
    //{icon: 'category', label: 'Categorias', routerLink: '/Categorias'},
    {icon: 'real_estate_agent', label: 'Vendas', routerLink: '/Vender'}
  ]

  dashboardNavigation(){
    this.router.navigate(['Dashboard']);
  }

  logoutNavigation(){
    this.router.navigate(['']);
  }
}
