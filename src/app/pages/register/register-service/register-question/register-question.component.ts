import { Component, OnInit } from '@angular/core';

import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';

import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import { ApiService } from '../../menu/services/api.service';
import { RegisterServiceService } from '../service/register-service.service';

@Component({
  selector: 'app-register-question',
  standalone: true,
  imports: [
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    DatePipe,
    ApiService,
    RegisterServiceService,
  ],
  templateUrl: './register-question.component.html',
  styleUrl: '../../style-add.component.scss'
})

export class RegisterQuestionComponent implements OnInit {
  newRegisterService: FormGroup

  formService: boolean = false;

  categories: any[] = [];
  subCategories: any[] = [];
  banks: any[] = [];
  account: any[] = [];
  agency: any[] = [];
  providers: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private registerService: RegisterServiceService,
  ) {
    this.newRegisterService = this.formBuilder.group({
      service_name: ['', Validators.required],
      category: ['', Validators.required],
      sub_category: ['', Validators.required],
      value_initial: ['', Validators.required],
      value_additional: [''],
      value_total: ['', Validators.required],
      location: ['', Validators.required],
      service_provider: ['', Validators.required],
      form_payment: [''],
      bank: ['', Validators.required],
      account: ['', Validators.required],
      agency: ['', Validators.required],
      date_initial: ['', Validators.required],
      date_final: [''],
      observation: [''],
      proof: ['']
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getBank();
    this.getProvider();
  }

  getCategories() {
    this.apiService.getCategory().subscribe(
      (data) => {
        this.categories = data.result
      },
      (error) => {
        console.log("Erro ao buscar Categorias", error);
      }
    )
  }

  getSubCategories(event: MatSelectChange): void {
    const selectedCategory = event.value;

    this.registerService.getSubCategoriesByCategory(selectedCategory).subscribe(
      (data) => {
        this.subCategories = data.subcategory
      },
      (error) => {
        console.log('Erro ao buscar sub categorias', error);
      }
    )
  }

  getBank() {
    this.registerService.getBank().subscribe(
      (data) => {
        this.banks = data.result
      },
      (error) => {
        console.log("Erro ao bancos", error);
      }
    )
  }

  getDataByBank(event: MatSelectChange): void {
    const selectedBank = event.value;

    this.registerService.getDataByBank(selectedBank).subscribe(
      (data) => {
        if (data.accounts && data.accounts.length > 0) {
          const firstAccount = data.accounts[0];

          this.account = firstAccount.number_account;
          this.agency = firstAccount.agency;
        } else {
          console.log('Nenhuma conta encontrada para este banco.');
        }
      },
      (error) => {
        console.log('Erro ao buscar dados do banco', error);
      }
    );
  }

  getProvider(){
    this.registerService.getProviders().subscribe(
      (data) =>{
        this.providers = data.results
      },
      (error) => {
        console.log('Erro ao buscar dados do banco', error);
      }
    )
  }

  formPayament = [
    { payment: 'Dinheiro' },
    { payment: 'Cartão de Crédito' },
    { payment: 'Cartão de Débito' },
    { payment: 'PIX' },
    { payment: 'Cheque' }
  ]

  maskMoneyOne(event: any): void {
    const inputValue = event.target.value;
    const formattedValue = this.maskCurrency(inputValue);
    this.newRegisterService.controls['value_initial'].setValue(formattedValue, { emitEvent: false });
  }

  maskMoneyTwo(event: any): void {
    const inputValue = event.target.value;
    const formattedValue = this.maskCurrency(inputValue);
    this.newRegisterService.controls['value_additional'].setValue(formattedValue, { emitEvent: false });
  }

  maskCurrency(value: string): string {
    const numericValue = value.replace(/[^0-9]/g, '');
    const formattedValue = this.formatAsCurrency(numericValue);
    return formattedValue;
  }

  getValueInitial() {
    const valueUm = this.newRegisterService.get('value_initial')?.value;
    let valueDois = this.newRegisterService.get('value_additional')?.value;

    if (!valueDois) {
      valueDois = '0';
    }

    const valueUmFormatado = parseFloat(valueUm.replace(/[^\d.-]/g, ''));
    const valueDoisFormatado = parseFloat(valueDois.replace(/[^\d.-]/g, ''));

    const resultFinal = valueUmFormatado + valueDoisFormatado;

    const resultadoFormatado = resultFinal.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });

    this.newRegisterService.patchValue({ value_total: resultadoFormatado });
  }

  formatAsCurrency(value: string): string {
    const numberValue = parseFloat(value) / 100;
    return 'R$ ' + numberValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
}
