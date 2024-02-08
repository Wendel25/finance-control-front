import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) { }

  errorNewCategory() {
    this.snackBar.open(`Erro ao cadastrar nova categoria`, 'Fechar', {
      duration: 4000,
    });
  }

  errorDeleteCategory() {
    this.snackBar.open(`Erro ao deletar categoria`, 'Fechar', {
      duration: 4000,
    });
  }

  errorNewSubCategory() {
    this.snackBar.open(`Erro ao cadastrar nova sub categoria`, 'Fechar', {
      duration: 4000,
    });
  }

  errorDeleteSubCategory() {
    this.snackBar.open(`Erro ao deletar sub categoria`, 'Fechar', {
      duration: 4000,
    });
  }
}
