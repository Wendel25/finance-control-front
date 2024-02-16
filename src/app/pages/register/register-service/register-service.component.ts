import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { RegisterQuestionComponent } from './register-question/register-question.component';
import { RegisterServiceService } from './service/register-service.service';

export interface tableService {
  produto: string;
  category: string;
  valor: string;
  spending: string;
  total: string;
}

@Component({
  selector: 'app-register-service',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,

    RegisterQuestionComponent
  ],
  providers: [RegisterServiceService],
  templateUrl: './register-service.component.html',
  styleUrl: '../register.component.scss'
})

export class RegisterServiceComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private apiService: RegisterServiceService
  ) { }

  services: any[] = []

  displayedColumns: string[] = [
    'service', 'subCategory', 'total', 'localization', 'provider', 'formPayment',
    'bank', 'accont', 'dateFinal', 'note', 'visibility', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getData() {
    this.apiService.getServices().subscribe(
      (data) => {
        this.services = data.results
        this.dataSource.data = this.services
      },
      (error) => {
        console.log("Erro ao buscar serviços", error);
      }
    )
  }

  questionRegister() {
    this.dialog.open(RegisterQuestionComponent);
  }

  ngOnInit(): void {
    this.getData();
  }
}
