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

import { ApiService } from './../../services/api.service';

import { RegisterCategoryComponent } from './register-category/register-category.component';
import { MsgConfirmationComponent } from '../../../../../components/msg-confirmation/msg-confirmation.component';
import { SuccessService } from '../../../../../services/success.service';
import { ErrorService } from '../../../../../services/error.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
  MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,

    CommonModule,
    HttpClientModule,

    RegisterCategoryComponent
  ],
  providers: [
    ApiService
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})

export class CategoryComponent implements OnInit{
  displayedColumns: string[] = ['categories', 'delete'];
  dataSource = new MatTableDataSource<any>([]);

  categories: any[] = [];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private successService: SuccessService,
    private errorService: ErrorService,
  ){}

  dataCategory(){
    this.apiService.getCategory().subscribe(
      (data) =>{
        this.categories = data.result
        this.dataSource.data = this.categories;
      },
      (error) =>{
        console.log("Erro ao buscar categorias", error);
      }
    )
  }

  deleteCategory(category: any) {
    const dialogRef = this.dialog.open(MsgConfirmationComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(
      result =>{
        if(result){
          const categoryId = category.id

          this.apiService.deleteCategory(categoryId).subscribe(
            (data) =>{
              this.successService.successDeleteCategory();
              this.dataCategory();
            },
            (error) =>{
              console.log("Erro ao deletar categoria", error);
              this.errorService.errorDeleteCategory();
            }
          )
        }else{}
      }
    )
  }

  openModalRegisterNewCategory(){
    const dialogRef = this.dialog.open(RegisterCategoryComponent);

    dialogRef.componentInstance.newCategory.subscribe(() => {
      this.dataCategory();
    });
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.dataCategory();
  }
}
