import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import { ApiService } from '../../services/api.service';
import { ErrorService } from '../../../../services/error.service';
import { SuccessService } from '../../../../services/success.service';

@Component({
  selector: 'app-register-product',
  standalone: true,
  imports: [
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    ApiService
  ],
  templateUrl: './register-product.component.html',
  styleUrl: './register-product.component.scss'
})

export class RegisterProductComponent implements OnInit {
  @Output() newProdut = new EventEmitter<void>()

  registerProduct!: FormGroup

  categories: any[] = [];
  suppliers: any[] = [];

  toppings = new FormControl();
  toppingList: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private errorService: ErrorService,
    private successService: SuccessService,
    private dialogRef: MatDialogRef<RegisterProductComponent>
  ) {
    this.registerProduct = this.formBuilder.group({
      product: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      amount: [1, Validators.required],
      supplier: ['', Validators.required],
      date_purchase: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getSuppliers();
  }

  getCategories() {
    this.apiService.getCategory().subscribe(
      (data) => {
        this.categories = data.results
      },
      (error) => {
        console.log("Erro ao buscar categorias", error);
      }
    )
  }

  maskMoney(event: any): void {
    const inputValue = event.target.value;
    const formattedValue = this.maskCurrency(inputValue);
    this.registerProduct.controls['price'].setValue(formattedValue, { emitEvent: false });
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

  getSuppliers() {
    this.apiService.getSuppliers().subscribe(
      (data) => {
        this.toppingList = data.results.map((supplier: any) => supplier.name);
      },
      (error) => {
        console.log("Erro ao buscar categorias", error);
      }
    )
  }

  submitRegisterProduct() {
    if (this.registerProduct.valid) {
      const formData = this.registerProduct.value;

      formData.price = parseFloat(formData.price.replace(/[^\d.-]/g, ''));
      formData.date_purchase = new Date(formData.date_purchase).toISOString().split('T')[0];

      this.apiService.insertProduct(formData).subscribe(
        (data) => {
          this.successService.successRegisterProvider();
          this.dialogRef.close();
          this.newProdut.emit();
        },
        (error) => {
          console.log("Erro ao cadastrar produto", error);
          this.errorService.errorRegisterProvider();
        }
      );
    }
  }
}
