import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})

export class UpdateUserComponent {
  @Output() updateUser = new EventEmitter<void>()

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data.user);
  }
}
