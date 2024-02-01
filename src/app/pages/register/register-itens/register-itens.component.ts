import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { CreateNewItemComponent } from './create-new-item/create-new-item.component';

export interface tableItens {
  produto: string;
  category: string;
  valor: string;
  spending: string;
  revenue: string;
  profit: string;
}

const ELEMENT_DATA: tableItens[] = [
  { produto: 'Escritório', category: 'Categoria 1', valor: '157,645.84', spending: '124,567.32', revenue: '10,321.75', profit: '50%'},
  { produto: 'Tecnologia', category: 'Categoria 2', valor: '324,789.56', spending: '289,876.21', revenue: '22,345.89', profit: '21,7%' },
  { produto: 'Marketing', category: 'Categoria 3', valor: '512,432.10', spending: '498,321.45', revenue: '33,210.54', profit: '11,1%' },
  { produto: 'Desenvolvimento', category: 'Categoria 4', valor: '1,278,987.65', spending: '1,035,432.10', revenue: '58,432.76', profit: '34.7%' },
  { produto: 'Viagem de Negócios', category: 'Categoria 5', valor: '268,765.43', spending: '226,543.21', revenue: '15,765.32', profit: '57,3%' }
];

@Component({
  selector: 'app-register-itens',
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

    CreateNewItemComponent
  ],
  templateUrl: './register-itens.component.html',
  styleUrl: '../register.component.scss'
})

export class RegisterItensComponent {
  constructor(public dialog: MatDialog) {}

  displayedColumns: string[] = ['produto', 'category', 'valor', 'spending', 'revenue', 'profit', 'edit', 'delete'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  questionRegister() {
   this.dialog.open(CreateNewItemComponent);
  }
}
