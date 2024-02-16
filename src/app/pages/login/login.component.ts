import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip';

import { LoginService } from './service/login.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private router: Router,
    private apiService: LoginService,
    private errorService: ErrorService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value

      this.apiService.login(formData).subscribe(
        (data) => {
          this.router.navigate(['Dashboard'])

          this.cookieService.set('name', data.name);
          this.cookieService.set('token', data.token);
        },
        (error) => {
          console.log('Error ao logar', error);

          if (error.error && error.error.error === 'Senha incorreta') {
            this.errorService.loginPassword();

          } else if (error.error && error.error.error === 'Email incorreto') {
            this.errorService.loginEmail();

          }else{
            this.errorService.authLogin();
          }
        }
      )
    }
  }
}
