import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

import { ApiService } from '../../../../services/api.service';
import { ErrorService } from '../../../../../../../services/error.service';
import { SuccessService } from '../../../../../../../services/success.service';

@Component({
  selector: 'app-register-category',
  standalone: true,
  imports: [
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
  templateUrl: './register-category.component.html',
  styleUrl: '../../sub-category/register-sub-category/register-sub-category.component.scss'
})

export class RegisterCategoryComponent{
  @Output() newCategory = new EventEmitter<void>()

  registerNewCategory!: FormGroup

  categoryList: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private errorService: ErrorService,
    private successService: SuccessService,
    private dialogRef: MatDialogRef<RegisterCategoryComponent>
  ){
    this.registerNewCategory = this.formBuilder.group({
      category: ['', Validators.required],
    });
  }

  registerCategory() {
    if (this.registerNewCategory.valid) {
      const formData = this.registerNewCategory.value;

      this.apiService.createCategory(formData).subscribe(
        (data) => {
          this.dialogRef.close();
          this.successService.successNewCategory();
          this.newCategory.emit();
        },
        (error) => {
          console.log(error);
          this.errorService.errorNewCategory();
        }
      );
    }
  }
}
