import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { EsternalService } from '../service/esternal.service';
import { ErrorService } from '../../../services/error.service';
import { SuccessService } from '../../../services/success.service';
import { RegisterSupplierComponent } from './register-supplier/register-supplier.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';

import { CpfPipe } from '../../../shared/pipes/cpf.pipe';
import { PhonePipe } from '../../../shared/pipes/phone.pipe';
import { LimitCaracterPipe } from '../../../shared/pipes/limit-caracter.pipe';
import { CnpjPipe } from '../../../shared/pipes/cnpj.pipe';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,

    CommonModule,
    HttpClientModule,

    CpfPipe,
    PhonePipe,
    LimitCaracterPipe,
    CnpjPipe,
  ],
  providers: [
    EsternalService
  ],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss'
})

export class SupplierComponent {
  displayedColumns: string[] = ['company', 'responsible', 'cnpj', 'number_phone', 'number_phone_reserve', 'cep', 'city', 'address', 'status', 'edit'];
  dataSource = new MatTableDataSource<any>([]);

  dataSupplier: any[] = []

  page: number = 1;
  pageSize: number = 15;

  constructor(
    private apiService: EsternalService,
    private dialog: MatDialog,
    private successService: SuccessService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  registerNewSupplier() {
    const dialogRef = this.dialog.open(RegisterSupplierComponent)
  }

  editSupplier(supplier: any) {
    const dialogRef = this.dialog.open(EditSupplierComponent, {
      data: supplier
    })
  }

  toggleActive(accounts: any) {
    accounts.active = accounts.active === 1 ? 0 : 1;
    accounts.active = accounts.active.toString();
    this.statusEvent(accounts);
  }

  statusEvent(activeSupplier: any) {
    const id = activeSupplier.id
    const formData = activeSupplier

  }
}
