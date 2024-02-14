import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Clipboard } from '@angular/cdk/clipboard';

import { ApiService } from '../../../services/api.service';
import { ErrorService } from '../../../../../../services/error.service';
import { SuccessService } from '../../../../../../services/success.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    MatTooltipModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [ApiService],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})

export class RegisterUserComponent {
  @Output() newUser = new EventEmitter<void>()

  registerNewUser!: FormGroup
  password: string = ''
  controlPassword: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private errorService: ErrorService,
    private successService: SuccessService,
    private clipboard: Clipboard,
    private dialogRef: MatDialogRef<RegisterUserComponent>
  ){
    this.registerNewUser = this.formBuilder.group({
      nameNewUser: ['', Validators.required],
      nameRBXNewUser: ['', Validators.required],
      emailNewUser: ['', [Validators.required, Validators.email]],
      passwordNewUser: [this.password, Validators.required]
    });
  }

  generatePassword(event: MouseEvent) {
    event.preventDefault();

    let senhaGerada = '';
    const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*`;
    const lengthPassword = 12;

    for (let i = 0; i < lengthPassword; i++) {
      const index = Math.floor(Math.random() * characters.length);
      senhaGerada += characters.charAt(index);
    }

    if(senhaGerada){
      this.password = senhaGerada
      this.controlPassword = true
    }
  }

  copyToClipboard(value: string) {
    if (this.clipboard.copy(value)) {
      this.successService.sucessCopy();
      this.controlPassword = false
    }
  }

  copyPassword(event: MouseEvent){
    event.preventDefault();
    this.copyToClipboard(this.password);
  }

  registerUser(){
    if(this.registerNewUser.valid){
      const formData = this.registerNewUser.value;

      this.apiService.registerUser(formData).subscribe(
        (data) =>{
          this.successService.successRegisterUSer();
          this.dialogRef.close()
          this.newUser.emit();
        },
        (error) =>{
          console.log("Erro ao cadastrar", error);
          if (error.error && error.error.error) {
            this.errorService.errorRegisterUserEmail();
          } else {
            this.errorService.errorRegisterUser();
          }
        }
      )
    }
  }

}
