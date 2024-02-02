import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-register-new-itens',
  standalone: true,
  imports: [
    MatTooltip,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './register-new-itens.component.html',
  styleUrl: './register-new-itens.component.scss'
})

export class RegisterNewItensComponent {

  menuOpen: boolean = false
  icon: string = 'vertical_align_bottom'
  menuText: string = 'Fechar Menu'

  closedMenu(){
    this.menuOpen = !this.menuOpen;
    this.icon = this.menuOpen ? 'closed' : 'vertical_align_bottom';
    this.menuText = this.menuOpen ? 'Fechar menu' : 'Abrir menu';
  }
}
