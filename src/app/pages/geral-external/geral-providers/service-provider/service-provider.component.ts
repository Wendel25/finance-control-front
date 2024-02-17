import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import { ApiService } from '../../../register/menu/services/api.service';
import { ErrorService } from '../../../../services/error.service';
import { SuccessService } from '../../../../services/success.service';
import { EsternalService } from '../../service/esternal.service';

@Component({
  selector: 'app-service-provider',
  standalone: true,
  imports: [
    NgxMaskDirective,
    NgxMaskPipe,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTooltipModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    ApiService,
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    DatePipe,
  ],
  templateUrl: './service-provider.component.html',
  styleUrl: './service-provider.component.scss'
})

export class ServiceProviderComponent {
  @Output() newRegisterProvider = new EventEmitter<void>()

  formRegisterProviderLegalPerson!: FormGroup;
  formRegisterProviderPhisicalPerson!: FormGroup;

  legalPerson: string = 'Pessoa Jurídica';
  phisicalPerson: string = 'Pessoa Fisica';

  formLegalPerson: boolean = false
  formPhysicalPerson: boolean = true

  city: string = '';
  district: string = '';
  address: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private successService: SuccessService,
    private dialogRef: MatDialogRef<ServiceProviderComponent>,
    private esternalService: EsternalService,
  ) {
    this.formRegisterProviderLegalPerson = this.formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.email],
      birth_date: [''],
      number_phone: ['', Validators.required],
      number_phone_reserve: [''],
      cep: ['', Validators.required],
      city: [this.city],
      district: [this.district],
      localization: [this.address],
      service_provider: ['', Validators.required],
    });

    this.formRegisterProviderPhisicalPerson = this.formBuilder.group({
      social_reason: ['', Validators.required],
      fantasy_name: [''],
      cnpj: ['', Validators.required],
      state_registration: [''],
      first_phone: ['', Validators.required],
      second_phone: [''],
      cep: ['', Validators.required],
      city: ['', Validators.required],
      localization: ['', Validators.required],
      district: ['', Validators.required],
      service_name: ['', Validators.required],
    });
  }

  changeForm(event: MatSlideToggleChange) {
    if (event.checked === true) {
      this.formLegalPerson = true;
      this.formPhysicalPerson = false;
    } else {
      this.formLegalPerson = false;
      this.formPhysicalPerson = true;
    }
  }

  getLocalizationByCEP(event: any){
    const cep = event.target.value;

    this.esternalService.getDataCEP(cep).subscribe(
      (data) => {
        const localization = data.localidade + ' - ' + data.uf

        this.city = localization;
        this.district = data.bairro;
        this.address = data.logradouro;

        this.formRegisterProviderLegalPerson.patchValue({
          city: data.localidade + ' - ' + data.uf,
          district: data.bairro,
          localization: data.logradouro
        });
      },
      (error) =>{
        console.log("Erro ao buscar dados do CEP", error);
      }
    )
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    return formattedDay + '/' + formattedMonth + '/' + year;
  }

  registerProviderLegalPerson() {
    if (this.formRegisterProviderLegalPerson.valid) {
      const formData = this.formRegisterProviderLegalPerson.value;

      const birthDate = this.formatDate(formData.birth_date);
      formData.birth_date = birthDate;

      this.esternalService.registerProviders(formData).subscribe(
        (data) =>{
          this.successService.successRegisterProvider();
          this.dialogRef.close();
          this.newRegisterProvider.emit();
        },
        (error) =>{
          console.log('Erro ao realizar cadastro', error);

          if (error.error && error.error.error === 'o cpf informado já existe no banco de dados') {
            this.errorService.errorRegisterProviderCPF();
          } else {
            this.errorService.errorRegisterProvider();
          }
        }
      )
    }
  }

  registerProviderPhisicalPerson() { }
}
