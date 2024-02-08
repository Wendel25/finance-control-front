import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';

import { SubCategoryComponent } from './sub-category/sub-category.component';
import { CategoryComponent } from './category/category.component';

@Component({
  selector: 'app-register-new-itens',
  standalone: true,
  imports: [
  MatDialogModule,
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

  constructor(
    public dialog: MatDialog
  ){}

  closedMenu(){
    this.menuOpen = !this.menuOpen;
    this.icon = this.menuOpen ? 'closed' : 'vertical_align_bottom';
    this.menuText = this.menuOpen ? 'Fechar menu' : 'Abrir menu';
  }

  newCategory(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CategoryComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  newSubCategory(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SubCategoryComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
