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

  displayedColumns: string[] = ['produto', 'category', 'valor', 'spending', 'payment', 'note', 'visibility', 'edit', 'delete'];
  dataSource = new MatTableDataSource([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  questionRegister() {
   this.dialog.open(CreateNewItemComponent);
  }
}
