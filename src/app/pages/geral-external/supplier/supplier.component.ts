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
import { ObservationLegalComponent } from './observation-legal/observation-legal.component';
import { ObservationComponent } from './observation/observation.component';
import { EditSupplierLegalComponent } from './edit-supplier-legal/edit-supplier-legal.component';

import { CpfPipe } from '../../../shared/pipes/cpf.pipe';
import { PhonePipe } from '../../../shared/pipes/phone.pipe';
import { LimitCaracterPipe } from '../../../shared/pipes/limit-caracter.pipe';
import { CnpjPipe } from '../../../shared/pipes/cnpj.pipe';
import { CepPipe } from '../../../shared/pipes/cep.pipe';

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
    CepPipe
  ],
  providers: [
    EsternalService
  ],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss'
})

export class SupplierComponent {
  displayedColumns: string[] = ['name', 'cpf', 'group_name', 'number_phone', 'number_phone_reserve', 'cep', 'city', 'address', 'localization', 'service_provider', 'observation', 'status', 'edit'];
  dataSource = new MatTableDataSource<any>([]);

  displayedColumnsLegal: string[] = ['social_reason', 'fantasy_name', 'cnpj', 'state_registration', 'group_name', 'number_phone', 'number_phone_reserve', 'cep', 'city', 'district', 'localization', 'service_provider', 'observation', 'status_', 'edit_'];
  dataSourceLegal = new MatTableDataSource<any>([]);

  dataSupplier: any[] = []
  dataSupplierLegal: any[] = []

  page: number = 1;
  pageSize: number = 15;

  showColumn: boolean = false;
  showColumnTwo: boolean = false;

  constructor(
    private apiService: EsternalService,
    private dialog: MatDialog,
    private successService: SuccessService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.getData();
    this.getDataProvidersLegal();
  }

  getData() {
    this.apiService.getDataSupplier(this.page, this.pageSize).subscribe(
      (data) => {
        this.dataSupplier = data.results;
        this.dataSource.data = this.dataSupplier;
      },
      (error) => {
        console.log("Erro ao buscar dados", error);
      }
    )
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

  applyFilterTwo(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceLegal.filter = filterValue.trim().toLowerCase();
  }

  registerNewSupplier() {
    const dialogRef = this.dialog.open(RegisterSupplierComponent);

    dialogRef.componentInstance.newRegisterSupplier.subscribe(() => {
      this.getData();
      this.getDataProvidersLegal();
    });
  }

  editSupplier(supplier: any) {
    const dialogRef = this.dialog.open(EditSupplierComponent, {
      data: supplier
    })

    dialogRef.componentInstance.updateSupplier.subscribe(() => {
      this.getData();
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

    this.apiService.updateSupplier(id, formData).subscribe(
      (data) => {
        this.successService.successUpdateUser();
        this.getData();
      },
      (error) => {
        console.log('Erro ao atualizar cadastro', error);
        this.errorService.errorUpdateUser()
      }
    )
  }

  observation(supplier: any) {
    const dialogRef = this.dialog.open(ObservationComponent, {
      data: supplier
    });

    dialogRef.componentInstance.newObservation.subscribe(() => {
      this.getData();
    });
  }

  getDataProvidersLegal(){
    this.apiService.getDataSupplierLegal(this.page, this.pageSize).subscribe(
      (data) => {
        this.dataSupplierLegal = data.results;
        this.dataSourceLegal.data = this.dataSupplierLegal;
      },
      (error) => {
        console.log("Erro ao buscar dados", error);
      }
    )
  };

  onPageChangeTwo(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getDataProvidersLegal();
  }

  toggleActiveTWO(accounts: any) {
    accounts.active = accounts.active === 1 ? 0 : 1;
    accounts.active = accounts.active.toString();
    this.statusEventTWO(accounts);
  }

  statusEventTWO(activeProvider: any) {
    const id = activeProvider.id
    const formData = activeProvider

    this.apiService.updateSupplierLegal(id, formData).subscribe(
      (data) => {
        this.successService.successUpdateUser();
        this.getDataProvidersLegal();
      },
      (error) => {
        console.log('Erro ao atualizar cadastro', error);
        this.errorService.errorUpdateUser()
      }
    )
  }

  observationProviderLegal(provider: any) {
    const dialogRef = this.dialog.open(ObservationLegalComponent, {
      data: provider
    });

    dialogRef.componentInstance.newObservationLegal.subscribe(() => {
      this.getDataProvidersLegal();
    });
  }

  editProviderLegal(provider: any) {
    const dialogRef = this.dialog.open(EditSupplierLegalComponent, {
      data: provider
    });

    dialogRef.componentInstance.updateSupplierLegal.subscribe(() => {
      this.getDataProvidersLegal();
    });
  }

  togglePhoneReserveColumn() {
    this.showColumn = !this.showColumn;
    const style = document.documentElement.style;
  }

  togglePhoneReserveColumnTwo() {
    this.showColumnTwo = !this.showColumnTwo;
    const style = document.documentElement.style;
  }
}
