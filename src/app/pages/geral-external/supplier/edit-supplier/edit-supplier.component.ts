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
  selector: 'app-edit-supplier',
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
  templateUrl: './edit-supplier.component.html',
  styleUrl: './edit-supplier.component.scss'
})

export class EditSupplierComponent {
  @Output() updateSupplier = new EventEmitter<void>()

  formUpdateSupplier!: FormGroup

  idUser: string = ''
  active: string = ''
  observation: string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private apiService: EsternalService,
    private errorService: ErrorService,
    private successService: SuccessService,
    private dialogRef: MatDialogRef<EditSupplierComponent>
  ) {
    this.idUser = data.id
    this.active = data.active
    this.observation = data.observation

    const name = data.name
    const cpf = data.cpf
    const group_name = data.group_name
    const number_phone = data.number_phone
    const number_phone_reserve = data.number_phone_reserve
    const cep = data.cep
    const city = data.city
    const district = data.district
    const localization = data.localization
    const number_localization = data.number_localization
    const service_provider = data.service_provider

    this.formUpdateSupplier = this.formBuilder.group({
      name: [name, Validators.required],
      cpf: [cpf, Validators.required],
      group_name: [group_name, Validators.required],
      number_phone: [number_phone, Validators.required],
      number_phone_reserve: [number_phone_reserve],
      cep: [cep, Validators.required],
      city: [city, Validators.required],
      district: [district, Validators.required],
      localization: [localization, Validators.required],
      number_localization: [number_localization, Validators.required],
      service_provider: [service_provider, Validators.required],
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
    if(this.formUpdateSupplier.valid){
      const id = this.idUser

      const formData = {
        name: this.formUpdateSupplier.get('name')?.value,
        cpf: this.formUpdateSupplier.get('cpf')?.value,
        group_name: this.formUpdateSupplier.get('group_name')?.value,
        service_provider: this.formUpdateSupplier.get('service_provider')?.value,
        number_phone: this.formUpdateSupplier.get('number_phone')?.value,
        number_phone_reserve: this.formUpdateSupplier.get('number_phone_reserve')?.value,
        cep: this.formUpdateSupplier.get('cep')?.value,
        city: this.formUpdateSupplier.get('city')?.value,
        district: this.formUpdateSupplier.get('district')?.value,
        localization: this.formUpdateSupplier.get('localization')?.value,
        number_localization: this.formUpdateSupplier.get('number_localization')?.value,
        observation: this.observation,
        active: this.active.toString()
      }

      this.apiService.updateSupplier(id, formData).subscribe(
        (data) => {
          this.successService.successUpdateUser();
          this.dialogRef.close()
          this.updateSupplier.emit();
        },
        (error) => {
          console.log('Erro ao atualizar cadastro', error);
          this.errorService.errorUpdateUser()
        }
      )
    }
  }
}
