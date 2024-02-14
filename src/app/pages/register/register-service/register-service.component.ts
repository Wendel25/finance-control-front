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

  displayedColumns: string[] = ['service', 'category', 'valor', 'spending', 'total', 'note','accont', 'visibility', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  questionRegister() {
    this.dialog.open(RegisterQuestionComponent);
  }
}
