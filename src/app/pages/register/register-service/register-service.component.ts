import { Component } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { RegisterQuestionComponent } from './register-question/register-question.component';

export interface tableService {
  produto: string;
  category: string;
  valor: string;
  spending: string;
  total: string;
}

const ELEMENT_DATA: tableService[] = [
  { produto: 'Arrumar Carro', category: 'Carros', valor: '200,00', spending: '50,00', total: '250,00'},
  { produto: 'Compra Porta', category: 'Compra', valor: '1.873,68', spending: '32,45', total: '1.909,13'},
  { produto: 'Compra de um novo computador', category: 'Compra', valor: '3.500,00', spending: '00,00', total: '3.500,00'},
  { produto: 'Compra de ONU', category: 'Compra', valor: '7.000,00', spending: '00,00', total: '7.000,00'},
  { produto: 'Abastecer carros', category: 'Carros', valor: '500,00', spending: '00,00', total: '500,00'},
];

@Component({
  selector: 'app-register-service',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,

    RegisterQuestionComponent
  ],
  templateUrl: './register-service.component.html',
  styleUrl: '../register.component.scss'
})

export class RegisterServiceComponent {
  constructor(public dialog: MatDialog) {}

  displayedColumns: string[] = ['service', 'category', 'valor', 'spending', 'total', 'edit', 'delete'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  questionRegister() {
    this.dialog.open(RegisterQuestionComponent);
  }
}
