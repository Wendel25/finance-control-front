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

import { EsternalService } from '../../service/esternal.service';
import { ErrorService } from '../../../../services/error.service';
import { SuccessService } from '../../../../services/success.service';

@Component({
  selector: 'app-edit-provider',
  standalone: true,
  imports: [
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
  templateUrl: './edit-provider.component.html',
  styleUrl: './edit-provider.component.scss'
})

export class EditProviderComponent {
  @Output() updateProvider = new EventEmitter<void>()

  formUpdateProvider!: FormGroup

  idUser: string = ''
  active: string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private apiService: EsternalService,
    private errorService: ErrorService,
    private successService: SuccessService,
    private dialogRef: MatDialogRef<EditProviderComponent>
  ) {
    this.idUser = data.id
    this.active = data.active

    const name = data.name
    const cpf = data.cpf
    const birth_date = data.birth_date
    const service_provider = data.service_provider
    const number_phone = data.number_phone
    const number_phone_reserve = data.number_phone_reserve
    const cep = data.cep
    const city = data.city
    const district = data.district
    const localization = data.localization

    this.formUpdateProvider = this.formBuilder.group({
      name: [name, Validators.required],
      cpf: [cpf, Validators.required],
      birth_date: [birth_date, Validators.required],
      service_provider: [service_provider, Validators.required],
      number_phone: [number_phone, Validators.required],
      number_phone_reserve: [number_phone_reserve],
      cep: [cep, Validators.required],
      city: [city, Validators.required],
      district: [district, Validators.required],
      localization: [localization, Validators.required],
    });
  }

  registerProvider(){
    if(this.formUpdateProvider.valid){
      const id = this.idUser

      const formData = {
        name: this.formUpdateProvider.get('name')?.value,
        cpf: this.formUpdateProvider.get('cpf')?.value,
        birth_date: this.formUpdateProvider.get('birth_date')?.value,
        service_provider: this.formUpdateProvider.get('service_provider')?.value,
        number_phone: this.formUpdateProvider.get('number_phone')?.value,
        number_phone_reserve: this.formUpdateProvider.get('number_phone_reserve')?.value,
        cep: this.formUpdateProvider.get('cep')?.value,
        city: this.formUpdateProvider.get('city')?.value,
        district: this.formUpdateProvider.get('district')?.value,
        localization: this.formUpdateProvider.get('localization')?.value,
        active: this.active.toString()
      }

      this.apiService.updateProviders(id, formData).subscribe(
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
