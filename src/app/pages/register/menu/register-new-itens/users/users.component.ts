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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ApiService } from '../../services/api.service';

import { SuccessService } from '../../../../../services/success.service';
import { ErrorService } from '../../../../../services/error.service';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatSlideToggleModule,
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
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'status', 'edit'];
  dataSource = new MatTableDataSource<any>([]);

  users: any[] = [];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private successService: SuccessService,
    private errorService: ErrorService,
  ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModalRegisterNewUser() {
    const dialogRef = this.dialog.open(RegisterUserComponent);

    dialogRef.componentInstance.newUser.subscribe(() => {
      this.dataUser();
    });
  }

  dataUser() {
    this.apiService.getUsers().subscribe(
      (data) => {
        this.users = data.result;
        this.dataSource.data = this.users;
      },
      (error) => {
        console.log("Erro ao buscar usuários", error);
      }
    )
  }

  editUser(User: any) {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: { user: User }
    });

    dialogRef.componentInstance.updateUser.subscribe(() => {
      this.dataUser();
    });
  }

  ngOnInit(): void {
    this.dataUser();
  }

  toggleActive(user: any) {
    user.active = user.active === 1 ? 0 : 1;
    user.active = user.active.toString();
    this.statusUser(user);
  }

  statusUser(user: any) {
    const id = user.id;
    const formData = user

    this.apiService.updateUsers(id, formData).subscribe(
      (data) => {
        this.successService.successUpdateUser();
        this.dataUser();
      },
      (error) =>{
        console.log('Erro ao desativar usuario', error);
        this.errorService.errorUpdateUserStatus();
      }
    );
  }
}
