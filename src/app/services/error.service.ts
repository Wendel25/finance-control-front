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

  errorNewCategoryExiste() {
    this.snackBar.open(`Essa categoria já existe cadastrada`, 'Fechar', {
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

  errorRegisterUser() {
    this.snackBar.open(`Erro ao cadastrar usuário`, 'Fechar', {
      duration: 4000,
    });
  }

  errorRegisterUserEmail() {
    this.snackBar.open(`Usuário já cadastrado com este e-mail. Favor tentar novamente`, 'Fechar', {
      duration: 4000,
    });
  }

  errorUpdateUser() {
    this.snackBar.open(`Erro ao atualizar cadastro`, 'Fechar', {
      duration: 4000,
    });
  }

  errorUpdateUserStatus() {
    this.snackBar.open(`Erro ao desativar usuário`, 'Fechar', {
      duration: 4000,
    });
  }
}
