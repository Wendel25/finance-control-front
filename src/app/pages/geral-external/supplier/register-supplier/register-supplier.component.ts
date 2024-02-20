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
import { MatDatepickerModule } from '@angular/material/datepicker';
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
  ],
  templateUrl: './register-supplier.component.html',
  styleUrl: './register-supplier.component.scss'
})

export class RegisterSupplierComponent {
  formRegisterSupplier!: FormGroup;

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
    this.formRegisterSupplier = this.formBuilder.group({
      supplier: ['', Validators.required],
      leader_person: [''],
      cnpj: ['', Validators.required],
      number_phone: ['', Validators.required],
      number_phone_reserve: [''],
      cep: ['', Validators.required],
      city: [this.city],
      district: [this.district],
      localization: [this.address],
      email: ['', Validators.email],
    });
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

        this.formRegisterSupplier.patchValue({
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

  registerProviderLegalPerson() {
    if (this.formRegisterSupplier.valid) {
      const formData = this.formRegisterSupplier.value;

    }
  }
}
