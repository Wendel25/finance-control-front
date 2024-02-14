import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { ApiService } from '../../../../services/api.service';
import { ErrorService } from '../../../../../../../services/error.service';
import { SuccessService } from '../../../../../../../services/success.service';

@Component({
  selector: 'app-register-sub-category',
  standalone: true,
  imports: [
    MatSelectModule,
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
  templateUrl: './register-sub-category.component.html',
  styleUrl: './register-sub-category.component.scss'
})

export class RegisterSubCategoryComponent implements OnInit{
  @Output() newSubCategory = new EventEmitter<void>()

  registerNewSubCategory!: FormGroup

  categories: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private errorService: ErrorService,
    private successService: SuccessService,
    private dialogRef: MatDialogRef<RegisterSubCategoryComponent>
  ){
    this.registerNewSubCategory = this.formBuilder.group({
      category: ['', Validators.required],
      subCategory: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.apiService.getCategory().subscribe(
      (data) =>{
        this.categories = data.result
      },
      (error) =>{
        console.log("Erro ao buscar categoria", error);
      }
    )
  }

  registerSubCategory() {
    if (this.registerNewSubCategory.valid) {
      const formData = this.registerNewSubCategory.value;

      this.apiService.createSubCategory(formData).subscribe(
        (data) =>{
          this.dialogRef.close();
          this.successService.successNewSubCategory();
          this.newSubCategory.emit()
        },
        (error) =>{
          console.log("Erro ao registrar", error);
          this.errorService.errorNewSubCategory();
        }
      )
    }
  }
}
