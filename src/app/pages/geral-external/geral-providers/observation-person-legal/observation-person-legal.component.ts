import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ErrorService } from '../../../../services/error.service';
import { SuccessService } from '../../../../services/success.service';
import { EsternalService } from '../../service/esternal.service';

@Component({
  selector: 'app-observation-person-legal',
  standalone: true,
  imports: [
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
    EsternalService,
  ],
  templateUrl: './observation-person-legal.component.html',
  styleUrl: './observation-person-legal.component.scss'
})

export class ObservationPersonLegalComponent {
  @Output() newObservationLegal = new EventEmitter<void>()

  formObservation!: FormGroup;

  id: string = '';
  data_results: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private successService: SuccessService,
    private dialogRef: MatDialogRef<ObservationPersonLegalComponent>,
    private apiService: EsternalService,
  ) {
    this.data_results = data
    this.id = data.id
    const observation = data.observation

    this.formObservation = this.formBuilder.group({
      observation: [observation],
    });
  }

  registerObs() {
    const id = this.id;
    const formData = {
      id: id,
      fantasy_name: this.data.fantasy_name,
      cnpj: this.data.cnpj,
      social_reason: this.data.social_reason,
      state_registration: this.data.state_registration,
      group_name: this.data.group_name,
      number_phone: this.data.number_phone,
      number_phone_reserve: this.data.number_phone_reserve,
      cep: this.data.cep,
      city: this.data.city,
      district: this.data.district,
      localization: this.data.localization,
      number_localization: this.data.number_localization,
      service_provider: this.data.service_provider,
      active: this.data.active.toString(),
      observation: this.formObservation.value.observation
    };

    this.apiService.updateProvidersLegal(id, formData).subscribe(
      (data) => {
        this.successService.successUpdateUser();
        this.dialogRef.close()
        this.newObservationLegal.emit();
      },
      (error) => {
        console.log('Erro ao atualizar cadastro', error);
        this.errorService.errorUpdateUser()
      }
    )
  }
}
