import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SuccessService {

  constructor(private snackBar: MatSnackBar) { }

  successNewCategory() {
    this.snackBar.open(`Categoria cadastrada com sucesso`, 'Fechar', {
      duration: 4000,
    });
  }

  successDeleteCategory() {
    this.snackBar.open(`Categoria deletada com sucesso`, 'Fechar', {
      duration: 4000,
    });
  }

  successNewSubCategory() {
    this.snackBar.open(`Sub Categoria cadastrada com sucesso`, 'Fechar', {
      duration: 4000,
    });
  }

  successDeleteSubCategory() {
    this.snackBar.open(`Sub Categoria deletada com sucesso`, 'Fechar', {
      duration: 4000,
    });
  }

  successRegisterUSer() {
    this.snackBar.open(`Usuário cadastrado com sucesso`, 'Fechar', {
      duration: 4000,
    });
  }

  sucessCopy(){
    this.snackBar.open(`Copiado com sucesso`, 'Fechar', {
      duration: 4000,
    });
  }

  successUpdateUser(){
    this.snackBar.open(`Cadastro atualizado com sucesso`, 'Fechar', {
      duration: 4000,
    });
  }

  successRegisterAccount(){
    this.snackBar.open(`Conta cadastrada com sucesso`, 'Fechar', {
      duration: 4000,
    });
  }

  successUpdateAccount(){
    this.snackBar.open(`Conta atualizada com sucesso`, 'Fechar', {
      duration: 4000,
    });
  }

  successRegisterProvider(){
    this.snackBar.open(`Cadastro realizado com sucesso`, 'Fechar', {
      duration: 4000,
    });
  }
}
