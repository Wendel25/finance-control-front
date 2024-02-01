import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-register-question',
  standalone: true,
  imports: [
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    DatePipe,
  ],
  templateUrl: './register-question.component.html',
  styleUrl: '../../style-add.component.scss'
})

export class RegisterQuestionComponent {
  newRegisterService: FormGroup

  formService: boolean = false;
  fieldInvalid: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
  ){
    this.newRegisterService = this.formBuilder.group({
      nameService: ['', Validators.required],
      categoryService: ['', Validators.required],
      valueService: ['', Validators.required],
      localizationService: ['', Validators.required],
      dateInitalService: ['', Validators.required],
      dateFinalService: [{ value: null, disabled: true }, Validators.required]
    });
  }

  categoriesService = [
    {name: 'Carros', value: '1'},
    {name: 'Compra', value: '2'}
  ]

  checkboxCliked(event: any){
    this.fieldInvalid = !event.checked;

    if (this.fieldInvalid) {
      this.newRegisterService.get('dateFinalService')?.disable();
    }else{
      this.newRegisterService.get('dateFinalService')?.enable();
    }
  }

  maskMoneyThree(event: any): void {
    const inputValue = event.target.value;
    const formattedValue = this.maskCurrency(inputValue);

    this.newRegisterService.controls['valueService'].setValue(formattedValue, { emitEvent: false });
  }

  maskCurrency(value: string): string {
    const numericValue = value.replace(/[^0-9]/g, '');
    const formattedValue = this.formatAsCurrency(numericValue);
    return formattedValue;
  }

  formatAsCurrency(value: string): string {
    const numberValue = parseFloat(value) / 100;
    return 'R$ ' + numberValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
}
