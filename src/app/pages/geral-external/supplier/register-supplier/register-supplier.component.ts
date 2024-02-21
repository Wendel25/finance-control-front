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
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ApiService } from '../../../register/menu/services/api.service';
import { ErrorService } from '../../../../services/error.service';
import { SuccessService } from '../../../../services/success.service';
import { EsternalService } from '../../service/esternal.service';

@Component({
  selector: 'app-register-supplier',
  standalone: true,
  imports: [
    MatProgressBarModule,
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
    DatePipe,
  ],
  templateUrl: './register-supplier.component.html',
  styleUrl: './register-supplier.component.scss'
})

export class RegisterSupplierComponent {
  @Output() newRegisterSupplier = new EventEmitter<void>()

  formRegisterSupplierLegalPerson!: FormGroup;
  formRegisterSupplierPhisicalPerson!: FormGroup;

  legalPerson: string = 'Pessoa Fisica';
  phisicalPerson: string = 'Pessoa Jurídica';

  formLegalPerson: boolean = false
  formPhysicalPerson: boolean = true
  controlBarLoading: boolean = false

  city: string = '';
  district: string = '';
  address: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private successService: SuccessService,
    private dialogRef: MatDialogRef<RegisterSupplierComponent>,
    private esternalService: EsternalService,
  ) {
    this.formRegisterSupplierLegalPerson = this.formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      group_name: [''],
      number_phone: ['', Validators.required],
      number_phone_reserve: [''],
      cep: ['', Validators.required],
      city: [this.city],
      district: [this.district],
      localization: [this.address],
      number_localization: [''],
      service_provider: ['', Validators.required],
      observation: [''],
    });

    this.formRegisterSupplierPhisicalPerson = this.formBuilder.group({
      social_reason: ['', Validators.required],
      fantasy_name: [''],
      cnpj: ['', Validators.required],
      state_registration: [''],
      group_name: [''],
      number_phone: ['', Validators.required],
      number_phone_reserve: [''],
      cep: ['', Validators.required],
      city: [this.city],
      district: [this.district],
      localization: [this.address],
      number_localization: [''],
      service: ['', Validators.required],
      observation: ['']
    });
  }

  groups = [
    { group: 'Camila Ribeiro Moreno - RURAL' },
    { group: 'Jonathan de Camargo - RURAL' },
    { group: 'Camila Ribeiro Moreno - PF' },
    { group: 'Jonathan de Camargo - PF' },
    { group: 'OAI LTDA' },
    { group: 'OAI LTDA - GNP' },
    { group: 'Over All' },
    { group: 'Over All - GNP' },
    { group: 'CRM SERVIÇOS' },
    { group: 'CRM SERVIÇOS - GNP' },
    { group: 'Lonca' },
    { group: 'Lonca - GNP' },
    { group: 'Camargo Holding' },
    { group: 'Unlimited' },
    { group: 'Unlimited - GNP' },
    { group: 'Terceiros' },
    { group: 'Outros' },
  ]

  changeForm(event: MatSlideToggleChange) {
    if (event.checked === true) {
      this.formLegalPerson = true;
      this.formPhysicalPerson = false;
    } else {
      this.formLegalPerson = false;
      this.formPhysicalPerson = true;
    }
  }

  getLocalizationByCEP(event: any) {
    this.controlBarLoading = true;
    const cep = event.target.value;

    this.esternalService.getDataCEP(cep).subscribe(
      (data) => {
        const localization = data.localidade + ' - ' + data.uf;

        this.city = localization;
        this.district = data.bairro;
        this.address = data.logradouro;

        this.formRegisterSupplierLegalPerson.patchValue({
          city: data.localidade + ' - ' + data.uf,
          district: data.bairro,
          localization: data.logradouro
        });

        this.formRegisterSupplierPhisicalPerson.patchValue({
          city: data.localidade + ' - ' + data.uf,
          district: data.bairro,
          localization: data.logradouro
        });

        this.controlBarLoading = false;
      },
      (error) => {
        this.controlBarLoading = false;
        console.log("Erro ao buscar dados do CEP", error);
      }
    )
  }

  registerProviderPhisicalPerson() {
    if (this.formRegisterSupplierPhisicalPerson.valid) {
      const formData = this.formRegisterSupplierPhisicalPerson.value;

      this.esternalService.registerSupplierLegal(formData).subscribe(
        (data) => {
          this.successService.successRegisterProvider();
          this.dialogRef.close();
          this.newRegisterSupplier.emit();
        },
        (error) => {
          console.log('Erro ao realizar cadastro', error);
          this.errorService.errorRegisterProvider();
        }
      )
    }
  }

  registerProviderLegalPerson() {
    if (this.formRegisterSupplierLegalPerson.valid) {
      const formData = this.formRegisterSupplierLegalPerson.value;

      this.esternalService.registerSupplier(formData).subscribe(
        (data) => {
          this.successService.successRegisterProvider();
          this.dialogRef.close();
          this.newRegisterSupplier.emit();
        },
        (error) => {
          console.log('Erro ao realizar cadastro', error);
          this.errorService.errorRegisterProvider();
        }
      )
    }
  }
}
