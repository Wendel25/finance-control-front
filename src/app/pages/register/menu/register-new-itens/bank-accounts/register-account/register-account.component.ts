import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

import { ApiService } from '../../../services/api.service';
import { ErrorService } from '../../../../../../services/error.service';
import { SuccessService } from '../../../../../../services/success.service';

@Component({
  selector: 'app-register-account',
  standalone: true,
  imports: [
    MatSelectModule,
    MatTooltipModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [ApiService],
  templateUrl: './register-account.component.html',
  styleUrl: './register-account.component.scss'
})

export class RegisterAccountComponent {
  @Output() newAccount = new EventEmitter<void>()

  accountsBank!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private errorService: ErrorService,
    private successService: SuccessService,
    private dialogRef: MatDialogRef<RegisterAccountComponent>
  ){
    this.accountsBank = this.formBuilder.group({
      holder: ['', Validators.required],
      type_account: ['', Validators.required],
      number_account: ['', Validators.required],
      agency: ['', Validators.required],
      bank: ['', Validators.required]
    });
  }

  typeAccount = [
    {name: 'Conta Corrente'},
    {name: 'Conta Corrente Especial'},
    {name: 'Conta Poupança'},
    {name: 'Conta Salário'},
    {name: 'Conta Conjunta'},
    {name: 'Conta Empresarial'},
    {name: 'Conta de Investimento'}
  ]

  registerAccount(){
    if(this.accountsBank.valid){
      const formData = this.accountsBank.value;

      this.apiService.insertAccount(formData).subscribe(
        (data) =>{
          this.successService.successRegisterAccount();
          this.newAccount.emit();
          this.dialogRef.close()
        },
        (error) =>{
          console.log("Error ao cadastrar nova conta", error);
          this.errorService.errorRegisterAccount();
        }
      )
    }
  }
}
