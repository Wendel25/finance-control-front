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
import { MatPaginatorModule } from '@angular/material/paginator';

import { ApiService } from '../../register/menu/services/api.service';
import { ErrorService } from '../../../services/error.service';
import { SuccessService } from '../../../services/success.service';

import { CpfPipe } from '../../../shared/pipes/cpf.pipe';
import { PhonePipe } from '../../../shared/pipes/phone.pipe';

import { ServiceProviderComponent } from './service-provider/service-provider.component';

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
    PhonePipe
  ],
  providers: [
    ApiService
  ],
  templateUrl: './geral-providers.component.html',
  styleUrl: './geral-providers.component.scss'
})

export class GeralProvidersComponent implements OnInit {
  displayedColumns: string[] =
    ['name', 'number_cpf', 'birth_date', 'number_phone', 'number_phone_reserve', 'cep', 'city', 'district', 'localization', 'service_provider', 'status', 'edit'];
  dataSource = new MatTableDataSource<any>([]);

  dataProviders: any[] = []

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private successService: SuccessService,
    private errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.apiService.getDataProviders().subscribe(
      (data) => {
        this.dataProviders = data.results;
        this.dataSource.data = this.dataProviders;
      },
      (error) => {
        console.log("Erro ao buscar dados");
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  registerNewProvider() {
    const dialogRef = this.dialog.open(ServiceProviderComponent);

    dialogRef.componentInstance.newRegisterProvider.subscribe(() => {
      this.getData();
    });
  }

  toggleActive(accounts: any) {
    accounts.active = accounts.active === 1 ? 0 : 1;
    accounts.active = accounts.active.toString();
    this.statusEvent(accounts);
  }

  editProvider(provider: any) { }

  statusEvent(accounts: any) { }
}
