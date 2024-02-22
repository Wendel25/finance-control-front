import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ListCategoryComponent } from './list-category/list-category.component';

@Component({
  selector: 'app-menu-products',
  standalone: true,
  imports: [
    MatMenuModule,
    MatDialogModule,
    MatTooltip,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './menu-products.component.html',
  styleUrl: './menu-products.component.scss'
})

export class MenuProductsComponent {
  constructor(
    public dialog: MatDialog
  ) { }

  newCategory(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ListCategoryComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
