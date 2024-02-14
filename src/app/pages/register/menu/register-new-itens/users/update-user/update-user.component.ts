import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ApiService } from '../../../services/api.service';
import { ErrorService } from '../../../../../../services/error.service';
import { SuccessService } from '../../../../../../services/success.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    HttpClientModule,
    MatTooltipModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [ApiService],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})

export class UpdateUserComponent {
  @Output() updateUser = new EventEmitter<void>()

  formUpdateUser!: FormGroup

  idUser: string = ''
  active: string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private errorService: ErrorService,
    private successService: SuccessService,
    private dialogRef: MatDialogRef<UpdateUserComponent>
  ) {
    this.idUser = data.user.id
    this.active = data.user.active
    const name = data.user.name
    const nameRBX = data.user.nameRBX
    const email = data.user.email

    this.formUpdateUser = this.formBuilder.group({
      updateNameUser: [name, Validators.required],
      updateNameRBXUser: [nameRBX, Validators.required],
      updateEmailUser: [email, [Validators.required, Validators.email]]
    });
  }

  registerUser() {
    if (this.formUpdateUser.valid) {
      const id = this.idUser
      const formData = {
        name: this.formUpdateUser.get('updateNameUser')?.value,
        nameRBX: this.formUpdateUser.get('updateNameRBXUser')?.value,
        email: this.formUpdateUser.get('updateEmailUser')?.value,
        active: this.active
      }

      this.apiService.updateUsers(id, formData).subscribe(
        (data) => {
          this.successService.successUpdateUser();
          this.dialogRef.close()
          this.updateUser.emit();
        },
        (error) => {
          console.log('Erro ao atualizar cadastro', error);
          this.errorService.errorUpdateUser()
        }
      )
    }
  }
}
