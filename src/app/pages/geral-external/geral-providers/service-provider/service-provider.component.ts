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

  title: string = 'Cadastrar prestador de serviço';

  legalPerson: string = 'Pessoa Jurídica';
  phisicalPerson: string = 'Pessoa Fisica';

  formLegalPerson: boolean = false
  formPhysicalPerson: boolean = true

  useFirstMask: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private errorService: ErrorService,
    private successService: SuccessService,
    private dialogRef: MatDialogRef<ServiceProviderComponent>
  ) {
    this.formRegisterProviderLegalPerson = this.formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.email],
      birth_date: [''],
      first_phone: ['', Validators.required],
      second_phone: [''],
      localization: ['', Validators.required],
      service_name: ['', Validators.required],
    });

    this.formRegisterProviderPhisicalPerson = this.formBuilder.group({
      social_reason: ['', Validators.required],
      fantasy_name: [''],
      cnpj: ['', Validators.required],
      state_registration: [''],
      first_phone: ['', Validators.required],
      second_phone: [''],
      localization: ['', Validators.required],
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

  registerProviderLegalPerson() { }

  registerProviderPhisicalPerson() { }
}
