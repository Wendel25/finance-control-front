import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective } from 'ngx-mask';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { EsternalService } from '../../service/esternal.service';
import { ErrorService } from '../../../../services/error.service';
import { SuccessService } from '../../../../services/success.service';

@Component({
  selector: 'app-geral-providers-legal',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMaskDirective,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [EsternalService],
  templateUrl: './geral-providers-legal.component.html',
  styleUrl: './geral-providers-legal.component.scss'
})

export class GeralProvidersLegalComponent {
  @Output() updateProvider = new EventEmitter<void>()

  formUpdateProviderLegal!: FormGroup

  idUser: string = ''
  active: string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private apiService: EsternalService,
    private errorService: ErrorService,
    private successService: SuccessService,
    private dialogRef: MatDialogRef<GeralProvidersLegalComponent>
  ) {
    this.idUser = data.id
    this.active = data.active

    const social_reason = data.social_reason
    const fantasy_name = data.fantasy_name
    const group_name = data.group_name
    const state_registration = data.state_registration
    const cnpj = data.cnpj
    const service_provider = data.service_provider
    const number_phone = data.number_phone
    const number_phone_reserve = data.number_phone_reserve
    const cep = data.cep
    const city = data.city
    const district = data.district
    const localization = data.localization
    const number_localization = data.number_localization

    this.formUpdateProviderLegal = this.formBuilder.group({
      social_reason: [social_reason, Validators.required],
      fantasy_name: [fantasy_name],
      group_name: [group_name],
      state_registration: [state_registration, Validators.required],
      cnpj: [cnpj, Validators.required],
      service_provider: [service_provider, Validators.required],
      number_phone: [number_phone, Validators.required],
      number_phone_reserve: [number_phone_reserve, Validators.required],
      cep: [cep, Validators.required],
      city: [city, Validators.required],
      district: [district, Validators.required],
      localization: [localization, Validators.required],
      number_localization: [number_localization, Validators.required],
    });
  }

  groups = [
    { group: null },
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

  registerProvider(){
    if(this.formUpdateProviderLegal.valid){
      const id = this.idUser

      const formData = {
        social_reason: this.formUpdateProviderLegal.get('social_reason')?.value,
        fantasy_name: this.formUpdateProviderLegal.get('fantasy_name')?.value,
        state_registration: this.formUpdateProviderLegal.get('state_registration')?.value,
        group_name: this.formUpdateProviderLegal.get('group_name')?.value,
        cnpj: this.formUpdateProviderLegal.get('cnpj')?.value,
        service_provider: this.formUpdateProviderLegal.get('service_provider')?.value,
        number_phone: this.formUpdateProviderLegal.get('number_phone')?.value,
        number_phone_reserve: this.formUpdateProviderLegal.get('number_phone_reserve')?.value,
        cep: this.formUpdateProviderLegal.get('cep')?.value,
        city: this.formUpdateProviderLegal.get('city')?.value,
        district: this.formUpdateProviderLegal.get('district')?.value,
        localization: this.formUpdateProviderLegal.get('localization')?.value,
        number_localization: this.formUpdateProviderLegal.get('number_localization')?.value,
        active: this.active.toString()
      }

      console.log(formData);

      this.apiService.updateProvidersLegal(id, formData).subscribe(
        (data) => {
          this.successService.successUpdateUser();
          this.dialogRef.close()
          this.updateProvider.emit();
        },
        (error) => {
          console.log('Erro ao atualizar cadastro', error);
          this.errorService.errorUpdateUser()
        }
      )
    }
  }
}
