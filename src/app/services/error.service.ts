import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) { }

  tokenInvalid() {
    this.snackBar.open(`Sua sessão inspirou. Faça login novamente!`, 'Fechar');
  }

  errorNewCategory() {
    this.snackBar.open(`Erro ao cadastrar nova categoria`, 'Fechar', {
      duration: 3000,
    });
  }

  errorNewCategoryExiste() {
    this.snackBar.open(`Essa categoria já existe cadastrada`, 'Fechar', {
      duration: 3000,
    });
  }

  errorDeleteCategory() {
    this.snackBar.open(`Erro ao deletar categoria`, 'Fechar', {
      duration: 3000,
    });
  }

  errorNewSubCategory() {
    this.snackBar.open(`Erro ao cadastrar nova sub categoria`, 'Fechar', {
      duration: 3000,
    });
  }

  errorDeleteSubCategory() {
    this.snackBar.open(`Erro ao deletar sub categoria`, 'Fechar', {
      duration: 3000,
    });
  }

  errorRegisterUser() {
    this.snackBar.open(`Erro ao cadastrar usuário`, 'Fechar', {
      duration: 3000,
    });
  }

  errorRegisterUserEmail() {
    this.snackBar.open(`Usuário já cadastrado com este e-mail. Favor tentar novamente`, 'Fechar', {
      duration: 3000,
    });
  }

  errorUpdateUser() {
    this.snackBar.open(`Erro ao atualizar cadastro`, 'Fechar', {
      duration: 3000,
    });
  }

  errorUpdateUserStatus() {
    this.snackBar.open(`Erro ao desativar usuário`, 'Fechar', {
      duration: 3000,
    });
  }

  errorRegisterAccount() {
    this.snackBar.open(`Erro ao cadastrar conta`, 'Fechar', {
      duration: 3000,
    });
  }

  loginEmail() {
    this.snackBar.open(`Email incorreto. Por favor, verifique sua senha e tente novamente`, 'Fechar', {
      duration: 3000,
    });
  }

  loginPassword() {
    this.snackBar.open(`Senha incorreta. Por favor, verifique sua senha e tente novamente`, 'Fechar', {
      duration: 3000,
    });
  }

  authLogin() {
    this.snackBar.open(`Erro ao autenticar usuário. Por favor, tente novamente mais tarde`, 'Fechar', {
      duration: 3000,
    });
  }

  UserDisabled() {
    this.snackBar.open(`Usuário desativado, entre em contato com o suporte para mais informações`, 'Fechar', {
      duration: 3000,
    });
  }

  errorRegisterProviderCPF() {
    this.snackBar.open(`O cpf informado já existe no banco de dados`, 'Fechar', {
      duration: 3000,
    });
  }

  errorRegisterProvider() {
    this.snackBar.open(`Erro ao realizar cadastro`, 'Fechar', {
      duration: 3000,
    });
  }
}
