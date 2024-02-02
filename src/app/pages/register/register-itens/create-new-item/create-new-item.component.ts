import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-create-new-item',
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
  ],
  templateUrl: './create-new-item.component.html',
  styleUrl: '../../style-add.component.scss'
})

export class CreateNewItemComponent {
  newRegisterItem: FormGroup

  title = 'Cadastrar Novo item';

  constructor(
    private formBuilder: FormBuilder,
  ){
    this.newRegisterItem = this.formBuilder.group({
      nameItem: ['', Validators.required],
      categoryItem: ['', Validators.required],
      InvestItem: ['', Validators.required],
      amountItem: ['', [Validators.required, Validators.min(1)]],
      intentionItem: ['', Validators.required],
      dateSaleItem: ['', Validators.required],
      noteItem: ['', Validators.required]
    });
  }

  categoriesItem = [
    {name: 'Categoria 1', value: '1'},
    {name: 'Categoria 2', value: '2'},
    {name: 'Categoria 3', value: '3'},
    {name: 'Categoria 4', value: '4'},
    {name: 'Categoria 5', value: '5'}
  ]

  maskMoney(event: any): void {
    const inputValue = event.target.value;
    const formattedValue = this.maskCurrency(inputValue);

    this.newRegisterItem.controls['InvestItem'].setValue(formattedValue, { emitEvent: false });
  }

  maskMoneyTwo(event: any): void {
    const inputValue = event.target.value;
    const formattedValue = this.maskCurrency(inputValue);

    this.newRegisterItem.controls['intentionItem'].setValue(formattedValue, { emitEvent: false });
  }

  maskCurrency(value: string): string {
    const numericValue = value.replace(/[^0-9]/g, '');
    const formattedValue = this.formatAsCurrency(numericValue);
    return formattedValue;
  }

  formatAsCurrency(value: string): string {
    const numberValue = parseFloat(value) / 100;
    return 'R$ ' + numberValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
}
