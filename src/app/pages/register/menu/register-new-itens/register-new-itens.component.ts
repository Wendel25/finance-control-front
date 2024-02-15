import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { SubCategoryComponent } from './hierarchyCategory/sub-category/sub-category.component';
import { CategoryComponent } from './hierarchyCategory/category/category.component';
import { UsersComponent } from './users/users.component';
import { BankAccountsComponent } from './bank-accounts/bank-accounts.component';

@Component({
  selector: 'app-register-new-itens',
  standalone: true,
  imports: [
  MatMenuModule,
    MatDialogModule,
    MatTooltip,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './register-new-itens.component.html',
  styleUrl: './register-new-itens.component.scss'
})

export class RegisterNewItensComponent {

  constructor(
    public dialog: MatDialog
  ) { }

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

  registerUser(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(UsersComponent, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  registerBankAccount(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(BankAccountsComponent, {
      width: '850px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
