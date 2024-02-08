import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-register-sale',
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
  ],
  templateUrl: './register-sale.component.html',
  styleUrl: '../register.component.scss'
})

export class RegisterSaleComponent {
  constructor(public dialog: MatDialog) {}

  displayedColumns: string[] = ['produto', 'category', 'valor', 'revenue', 'payment', 'note', 'visibility', 'edit', 'delete'];
  dataSource = new MatTableDataSource([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  questionRegister() {
   //this.dialog.open(CreateNewItemComponent);
  }
}
