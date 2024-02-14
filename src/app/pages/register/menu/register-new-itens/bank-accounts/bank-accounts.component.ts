import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ApiService } from '../../services/api.service';
import { RegisterAccountComponent } from './register-account/register-account.component';

@Component({
  selector: 'app-bank-accounts',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,

    CommonModule,
    HttpClientModule,
  ],
  providers: [
    ApiService
  ],
  templateUrl: './bank-accounts.component.html',
  styleUrl: './bank-accounts.component.scss'
})

export class BankAccountsComponent {
  displayedColumns: string[] = ['holder', 'typeAccount', 'numberAccount', 'agency', 'Bank','edit'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
  ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editUser(User: any) {
    this.dialog.open(RegisterAccountComponent);
  }

  openModalRegisterNewAccount(){}
}
