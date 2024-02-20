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

import { CpfPipe } from '../../../shared/pipes/cpf.pipe';
import { PhonePipe } from '../../../shared/pipes/phone.pipe';
import { LimitCaracterPipe } from '../../../shared/pipes/limit-caracter.pipe';
import { CnpjPipe } from '../../../shared/pipes/cnpj.pipe';
import { CepPipe } from '../../../shared/pipes/cep.pipe';

import { ServiceProviderComponent } from './service-provider/service-provider.component';
import { EditProviderComponent } from './edit-provider/edit-provider.component';
import { GeralProvidersLegalComponent } from './geral-providers-legal/geral-providers-legal.component';
import { ObservationComponent } from './observation/observation.component';
import { ObservationPersonLegalComponent } from './observation-person-legal/observation-person-legal.component';

@Component({
  selector: 'app-geral-providers',
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
  templateUrl: './geral-providers.component.html',
  styleUrl: './geral-providers.component.scss'
})

export class GeralProvidersComponent implements OnInit {
  displayedColumns: string[] =
    ['name', 'number_cpf', 'group_name', 'birth_date', 'number_phone', 'number_phone_reserve', 'cep', 'city', 'district', 'localization', 'service_provider', 'observation', 'status', 'edit'];
  dataSource = new MatTableDataSource<any>([]);

  displayedColumnsLegal: string[] =
    ['social_reason', 'fantasy_name', 'cnpj', 'group_name', 'state_registration', 'number_phone', 'number_phone_reserve', 'cep', 'city', 'district', 'localization', 'service_provider', 'observation', 'status_', 'edit_'];
  dataSourceLegal = new MatTableDataSource<any>([]);

  dataProviders: any[] = []
  dataProvidersLegal: any[] = []

  page: number = 1;
  pageSize: number = 15;
  showPhoneReserveColumn: boolean = false;
  showPhoneReserveColumnTwo: boolean = false;

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
    this.apiService.getDataProviders(this.page, this.pageSize).subscribe(
      (data) => {
        this.dataProviders = data.results;
        this.dataSource.data = this.dataProviders;
      },
      (error) => {
        console.log("Erro ao buscar dados", error);
      }
    )
  }

  getDataProvidersLegal() {
    this.apiService.getDataProvidersLegal(this.page, this.pageSize).subscribe(
      (data) => {
        this.dataProvidersLegal = data.results;
        this.dataSourceLegal.data = this.dataProvidersLegal;
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

  onPageChangeTwo(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getDataProvidersLegal();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  registerNewProvider() {
    const dialogRef = this.dialog.open(ServiceProviderComponent);

    dialogRef.componentInstance.newRegisterProvider.subscribe(() => {
      this.getData();
      this.getDataProvidersLegal();
    });
  }

  editProvider(provider: any) {
    const dialogRef = this.dialog.open(EditProviderComponent, {
      data: provider
    });

    dialogRef.componentInstance.updateProvider.subscribe(() => {
      this.getData();
    });
  }

  observationProvider(provider: any) {
    const dialogRef = this.dialog.open(ObservationComponent, {
      data: provider
    });

    dialogRef.componentInstance.newObservation.subscribe(() => {
      this.getData();
    });
  }

  observationProviderLegal(provider: any) {
    const dialogRef = this.dialog.open(ObservationPersonLegalComponent, {
      data: provider
    });

    dialogRef.componentInstance.newObservationLegal.subscribe(() => {
      this.getDataProvidersLegal();
    });
  }


  editProviderLegal(provider: any) {
    const dialogRef = this.dialog.open(GeralProvidersLegalComponent, {
      data: provider
    });

    dialogRef.componentInstance.updateProvider.subscribe(() => {
      this.getDataProvidersLegal();
    });
  }

  toggleActive(accounts: any) {
    accounts.active = accounts.active === 1 ? 0 : 1;
    accounts.active = accounts.active.toString();
    this.statusEvent(accounts);
  }

  statusEvent(activeProvider: any) {
    const id = activeProvider.id
    const formData = activeProvider

    this.apiService.updateProviders(id, formData).subscribe(
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

  toggleActiveTWO(accounts: any) {
    accounts.active = accounts.active === 1 ? 0 : 1;
    accounts.active = accounts.active.toString();
    this.statusEventTWO(accounts);
  }

  statusEventTWO(activeProvider: any) {
    const id = activeProvider.id
    const formData = activeProvider

    this.apiService.updateProvidersLegal(id, formData).subscribe(
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

  togglePhoneReserveColumn() {
    this.showPhoneReserveColumn = !this.showPhoneReserveColumn;
    const style = document.documentElement.style;
  }

  togglePhoneReserveColumnTwo() {
    this.showPhoneReserveColumnTwo = !this.showPhoneReserveColumnTwo;
    const style = document.documentElement.style;
  }
}
