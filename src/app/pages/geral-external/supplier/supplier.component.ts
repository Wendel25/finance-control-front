import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

import { ApiService } from '../../register/menu/services/api.service';
import { ErrorService } from '../../../services/error.service';
import { SuccessService } from '../../../services/success.service';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [
    MatSelectModule,
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
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss'
})

export class SupplierComponent {

}
