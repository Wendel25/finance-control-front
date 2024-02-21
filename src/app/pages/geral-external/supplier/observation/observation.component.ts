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
  selector: 'app-observation',
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
  templateUrl: './observation.component.html',
  styleUrl: './observation.component.scss'
})

export class ObservationComponent {
  @Output() newObservation = new EventEmitter<void>()

  formObservation!: FormGroup;

  id: string = '';
  data_results: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private successService: SuccessService,
    private dialogRef: MatDialogRef<ObservationComponent>,
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
      name: this.data.name,
      cpf: this.data.cpf,
      group_name: this.data.group_name,
      number_phone: this.data.number_phone,
      number_phone_reserve: this.data.number_phone_reserve,
      cep: this.data.cep,
      city: this.data.city,
      district: this.data.district,
      localization: this.data.localization,
      number_localization: this.data.number_localization,
      service_provider: this.data.service_provider,
      observation: this.formObservation.value.observation,
      active: this.data.active.toString()
    };

    this.apiService.updateSupplier(id, formData).subscribe(
      (data) => {
        this.successService.successUpdateUser();
        this.dialogRef.close()
        this.newObservation.emit();
      },
      (error) => {
        console.log('Erro ao atualizar cadastro', error);
        this.errorService.errorUpdateUser()
      }
    )
  }
}
