import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MsgConfirmationComponent } from '../../../../../../components/msg-confirmation/msg-confirmation.component';
import { RegisterSubCategoryComponent } from './register-sub-category/register-sub-category.component';

import { ApiService } from './../../../services/api.service';
import { SuccessService } from '../../../../../../services/success.service';
import { ErrorService } from '../../../../../../services/error.service';

@Component({
  selector: 'app-sub-category',
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
    ],
    providers: [
      ApiService
    ],
  templateUrl: './sub-category.component.html',
  styleUrl: '../category/category.component.scss'
})

export class SubCategoryComponent {
  displayedColumns: string[] = ['categories', 'subCategories', 'delete'];
  dataSource = new MatTableDataSource<any>([]);

  subCategories: any[] = [];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private successService: SuccessService,
    private errorService: ErrorService,
  ){}

  dataSubCategory(){
    this.apiService.getSubCategory().subscribe(
      (data) =>{
        this.subCategories = data.result;
        this.dataSource.data = this.subCategories
      },
      (error) =>{
        console.log('Erro ao buscar dados', error);
      }
    )
  }

  deleteCategory(subCategory: any) {
    const dialogRef = this.dialog.open(MsgConfirmationComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(
      result =>{
        if(result){
          const subCategoryId = subCategory.id

          this.apiService.deleteSubCategory(subCategoryId).subscribe(
            (data) =>{
              this.successService.successDeleteSubCategory();
              this.dataSubCategory();
            },
            (error) =>{
              console.log("Erro ao apagar sub categoria", error);
              this.errorService.errorDeleteSubCategory();
            }
          )
        }else{}
      }
    )
  }

  openModalRegisterNewSubCategory(){
    const dialogRef = this.dialog.open(RegisterSubCategoryComponent);

    dialogRef.componentInstance.newSubCategory.subscribe(() => {
      this.dataSubCategory();
    });
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.dataSubCategory();
  }
}
