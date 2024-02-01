import { Component } from '@angular/core';

import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [
    MenuComponent
  ],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {

}
