import { Component, OnInit } from '@angular/core';
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
import { ErrorService } from '../../../../../services/error.service';
import { SuccessService } from '../../../../../services/success.service';

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

export class BankAccountsComponent implements OnInit{
  displayedColumns: string[] = ['holder', 'typeAccount', 'numberAccount', 'agency', 'Bank','status'];
  dataSource = new MatTableDataSource<any>([]);

  accounts: any[] = []

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private successService: SuccessService,
    private errorService: ErrorService,
  ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAccountsBank(){
    this.apiService.getAccounts().subscribe(
      (data) =>{
        this.accounts = data.result;
        this.dataSource.data = this.accounts;
      },
      (error) =>{
        console.log("Erro ao buscar contas bancárias", error);
      }
    )
  }

  toggleActive(accounts: any) {
    accounts.active = accounts.active === 1 ? 0 : 1;
    accounts.active = accounts.active.toString();
    this.statusEvent(accounts);
  }

  statusEvent(accounts: any) {
    const id = accounts.id;
    const formData = {
      holder: accounts.holder,
      type_account: accounts.typeAccount,
      number_account: accounts.numberAccount,
      agency: accounts.agency,
      bank: accounts.bank,
      active: accounts.active
    }

    this.apiService.updateAccount(id, formData).subscribe(
      (data) =>{
        this.successService.successUpdateAccount();
        this.getAccountsBank();
      },
      (error) =>{
        console.log('Erro ao atualizar conta', error);
        this.errorService.errorUpdateUser();
      }
    )
  }

  openModalRegisterNewAccount(){
    const dialogRef = this.dialog.open(RegisterAccountComponent);

    dialogRef.componentInstance.newAccount.subscribe(() => {
      this.getAccountsBank();
    });
  }

  ngOnInit(): void {
    this.getAccountsBank();
  }
}
